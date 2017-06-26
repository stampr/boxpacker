import { PackedBox } from './packed-box.js';
import { ItemList } from './item-list.js';
import { OrientatedItemFactory } from './orientated-item-factory.js';
import { ConstrainedItem } from './constrained-item.js';

/**
 * Actual packer
 * @author Doug Wright
 * @package BoxPacker
 */
export class VolumePacker {
  /**
   * Constructor
   *
   * @param Box      $box
   * @param ItemList $items
   */
  constructor($box, $items)
  {
    // this.logger = new NullLogger();

    this.box = $box;
    this.items = $items;

    this.depthLeft = this.box.getInnerDepth();
    this.remainingWeight = this.box.getMaxWeight() - this.box.getEmptyWeight();
    this.widthLeft = this.box.getInnerWidth();
    this.lengthLeft = this.box.getInnerLength();
  }

  /**
   * Pack as many items as possible into specific given box
   * @return PackedBox packed box
   */
  pack()
  {
    // this.logger.debug("[EVALUATING BOX] {this.box.getReference()}");

    let $packedItems = new ItemList;

    this.layerWidth = this.layerLength = this.layerDepth = 0;

    let $prevItem = null;

    while (!this.items.isEmpty()) {

      let $itemToPack = this.items.extract();

      //skip items that are simply too heavy
      if (!this.checkNonDimensionalConstraints($itemToPack, $packedItems)) {
        continue;
      }

      let $nextItem = !this.items.isEmpty() ? this.items.top() : null;
      let $orientatedItem = this.getOrientationForItem($itemToPack, $prevItem, $nextItem, this.widthLeft, this.lengthLeft, this.depthLeft);

      if ($orientatedItem) {

        $packedItems.insert($orientatedItem.getItem());
        this.remainingWeight -= $orientatedItem.getItem().getWeight();

        this.lengthLeft -= $orientatedItem.getLength();
        this.layerLength += $orientatedItem.getLength();
        this.layerWidth = Math.max($orientatedItem.getWidth(), this.layerWidth);

        this.layerDepth = Math.max(this.layerDepth, $orientatedItem.getDepth()); //greater than 0, items will always be less deep

        this.usedLength = Math.max(this.usedLength, this.layerLength);
        this.usedWidth = Math.max(this.usedWidth, this.layerWidth);

        //allow items to be stacked in place within the same footprint up to current layerdepth
        let $stackableDepth = this.layerDepth - $orientatedItem.getDepth();
        this.tryAndStackItemsIntoSpace($packedItems, $prevItem, $nextItem, $orientatedItem.getWidth(), $orientatedItem.getLength(), $stackableDepth);

        $prevItem = $orientatedItem;

        if (this.items.isEmpty()) {
          this.usedDepth += this.layerDepth;
        }
      } else {

        $prevItem = null;

        if (this.widthLeft >= Math.min($itemToPack.getWidth(), $itemToPack.getLength()) && this.isLayerStarted()) {
          // this.logger.debug("No more fit in lengthwise, resetting for new row");
          this.lengthLeft += this.layerLength;
          this.widthLeft -= this.layerWidth;
          this.layerWidth = this.layerLength = 0;
          this.items.insert($itemToPack);
          continue;
        }
        else if (this.lengthLeft < Math.min($itemToPack.getWidth(), $itemToPack.getLength()) || this.layerDepth == 0) {
          // this.logger.debug("doesn't fit on layer even when empty");
          this.usedDepth += this.layerDepth;
          continue;
        }

        this.widthLeft = this.layerWidth ? Math.min(Math.floor(this.layerWidth * 1.1), this.box.getInnerWidth()) : this.box.getInnerWidth();
        this.lengthLeft = this.layerLength ? Math.min(Math.floor(this.layerLength * 1.1), this.box.getInnerLength()) : this.box.getInnerLength();
        this.depthLeft -= this.layerDepth;
        this.usedDepth += this.layerDepth;

        this.layerWidth = this.layerLength = this.layerDepth = 0;
        // this.logger.debug("doesn't fit, so starting next vertical layer");
        this.items.insert($itemToPack);
      }
    }
    // this.logger.debug("done with this box");
    return new PackedBox(
      this.box,
      $packedItems,
      this.widthLeft,
      this.lengthLeft,
      this.depthLeft,
      this.remainingWeight,
      this.usedWidth,
      this.usedLength,
      this.usedDepth);
  }

  /**
   * @param Item $itemToPack
   * @param OrientatedItem|null $prevItem
   * @param Item|null $nextItem
   * @param int $maxWidth
   * @param int $maxLength
   * @param int $maxDepth
   *
   * @return OrientatedItem|false
   */
  getOrientationForItem(
    $itemToPack,
    $prevItem,
    $nextItem,
    $maxWidth, $maxLength,
    $maxDepth
  ) {
    $prevItem = $prevItem || null;
    $nextItem = $nextItem || null;
    // this.logger.debug(
    //     "evaluating item {$itemToPack.getDescription()} for fit",
    //     [
    //         'item' => $itemToPack,
    //         'space' => [
    //             'maxWidth'    => $maxWidth,
    //             'maxLength'   => $maxLength,
    //             'maxDepth'    => $maxDepth,
    //             'layerWidth'  => this.layerWidth,
    //             'layerLength' => this.layerLength,
    //             'layerDepth'  => this.layerDepth
    //         ]
    //     ]
    // );

    let $orientatedItemFactory = new OrientatedItemFactory();
    // $orientatedItemFactory.setLogger(this.logger);
    let $orientatedItem = $orientatedItemFactory.getBestOrientation(this.box, $itemToPack, $prevItem, $nextItem, $maxWidth, $maxLength, $maxDepth);

    return $orientatedItem;
  }

  /**
   * Figure out if we can stack the next item vertically on top of this rather than side by side
   * Used when we've packed a tall item, and have just put a shorter one next to it
   *
   * @param ItemList       $packedItems
   * @param OrientatedItem $prevItem
   * @param Item           $nextItem
   * @param int            $maxWidth
   * @param int            $maxLength
   * @param int            $maxDepth
   */
  tryAndStackItemsIntoSpace(
    $packedItems,
    $prevItem,
    $nextItem,
    $maxWidth,
    $maxLength,
    $maxDepth
  ) {
    $prevItem = $prevItem || null;
    $nextItem = $nextItem || null;
    while (!this.items.isEmpty() && this.remainingWeight >= this.items.top().getWeight()) {
      let $stackedItem = this.getOrientationForItem(
        this.items.top(),
        $prevItem,
        $nextItem,
        $maxWidth,
        $maxLength,
        $maxDepth
      );
      if ($stackedItem) {
        this.remainingWeight -= this.items.top().getWeight();
        $maxDepth -= $stackedItem.getDepth();
        $packedItems.insert(this.items.extract());
      } else {
        break;
      }
    }
  }

  /**
   * @return bool
   */
  isLayerStarted()
  {
    return this.layerWidth > 0 && this.layerLength > 0 && this.layerDepth > 0;
  }

  /**
   * As well as purely dimensional constraints, there are other constraints that need to be met
   * e.g. weight limits or item-specific restrictions (e.g. max <x> batteries per box)
   *
   * @param Item     $itemToPack
   * @param ItemList $packedItems
   *
   * @return bool
   */
  checkNonDimensionalConstraints($itemToPack, $packedItems)
  {
    let $weightOK = $itemToPack.getWeight() <= this.remainingWeight;

    if ($itemToPack instanceof ConstrainedItem) {
      return $weightOK && $itemToPack.canBePackedInBox($packedItems.clone(), this.box);
    }

    return $weightOK;
  }
}
