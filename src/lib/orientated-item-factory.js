import { OrientatedItem } from './orientated-item.js';

import { PhpArray } from './php-array.js';

/**
 * Figure out orientations for an item and a given set of dimensions
 * @author Doug Wright
 * @package BoxPacker
 */
export class OrientatedItemFactory {
  constructor() {

  }

  /**
   * Get the best orientation for an item
   * @param Box_box
   * @param Item_item
   * @param OrientatedItem|null OrientatedItem_prevItem
   * @param Item|null Item_nextItem
   * @param int widthLeft
   * @param int lengthLeft
   * @param int depthLeft
   * @return OrientatedItem|false
   */
  getBestOrientation(Box_box, Item_item, OrientatedItem_prevItem, Item_nextItem, widthLeft, lengthLeft, depthLeft) {
    OrientatedItem_prevItem     = OrientatedItem_prevItem || null;
    Item_nextItem               = Item_nextItem || null;
    let $possibleOrientations   = this.getPossibleOrientations(Item_item, OrientatedItem_prevItem, widthLeft, lengthLeft, depthLeft);
    let $usableOrientations     = this.getUsableOrientations($possibleOrientations, Box_box, Item_item, OrientatedItem_prevItem, Item_nextItem);

    let $orientationFits = new PhpArray();
    /** @var OrientatedItem $orientation */
    for (let [$o,$orientation] of $usableOrientations) {
      let $orientationFit = Math.min(widthLeft - $orientation.getWidth(), lengthLeft - $orientation.getLength());
      $orientationFits.set($o, $orientationFit);
    }

    if ($orientationFits.size > 0) {
      $orientationFits.asort();
      // javascript doesn't have this concept
      // reset($orientationFits);
      // $bestFit = $usableOrientations[key($orientationFits)];
      let $bestFit = $usableOrientations[$orientationFits.first[0]];
      // this.logger.debug("Selected best fit orientation", ['orientation' => $bestFit]);
      return $bestFit;
    }
    else {
      return false;
    }
  }

  /**
   * Find all possible orientations for an item
   * @param Item_item
   * @param OrientatedItem|null OrientatedItem_prevItem
   * @param int widthLeft
   * @param int lengthLeft
   * @param int depthLeft
   * @return OrientatedItem[]
   */
  getPossibleOrientations(Item_item, OrientatedItem_prevItem, widthLeft, lengthLeft, depthLeft) {
    OrientatedItem_prevItem = OrientatedItem_prevItem || null;
    let $orientations = [];

    //Special case items that are the same as what we just packed - keep orientation
    if (OrientatedItem_prevItem && OrientatedItem_prevItem.getItem() == Item_item) {
      $orientations.push(new OrientatedItem(Item_item, OrientatedItem_prevItem.getWidth(), OrientatedItem_prevItem.getLength(), OrientatedItem_prevItem.getDepth()));
    }
    else {
      //simple 2D rotation
      $orientations.push(new OrientatedItem(Item_item, Item_item.getWidth(), Item_item.getLength(), Item_item.getDepth()));
      $orientations.push(new OrientatedItem(Item_item, Item_item.getLength(), Item_item.getWidth(), Item_item.getDepth()));

      //add 3D rotation if we're allowed
      if (!Item_item.getKeepFlat()) {
        $orientations.push(new OrientatedItem(Item_item, Item_item.getWidth(), Item_item.getDepth(), Item_item.getLength()));
        $orientations.push(new OrientatedItem(Item_item, Item_item.getLength(), Item_item.getDepth(), Item_item.getWidth()));
        $orientations.push(new OrientatedItem(Item_item, Item_item.getDepth(), Item_item.getWidth(), Item_item.getLength()));
        $orientations.push(new OrientatedItem(Item_item, Item_item.getDepth(), Item_item.getLength(), Item_item.getWidth()));
      }
    }

    //remove any that simply don't fit
    return $orientations.filter(item => {
      return item.getWidth() <= widthLeft && item.getLength() <= lengthLeft && item.getDepth() <= depthLeft;
    });
  }

  /**
   * @param OrientatedItem[] $possibleOrientations
   * @param Box              Box_box
   * @param Item             Item_item
   * @param OrientatedItem   OrientatedItem_prevItem
   * @param Item             Item_nextItem
   *
   * @return array
   */
  getUsableOrientations(
    $possibleOrientations,
    Box_box,
    Item_item,
    OrientatedItem_prevItem = null,
    Item_nextItem = null
  ) {
    OrientatedItem_prevItem = OrientatedItem_prevItem || null;
    Item_nextItem = Item_nextItem || null;
    /*
     * Divide possible orientations into stable (low centre of gravity) and unstable (high centre of gravity)
     */
    let $stableOrientations = [];
    let $unstableOrientations = [];

    for (let [,$orientation] of $possibleOrientations) {
      if ($orientation.isStable()) {
        $stableOrientations.push($orientation);
      } else {
        $unstableOrientations.push($orientation);
      }
    }

    let $orientationsToUse = [];

    /*
     * We prefer to use stable orientations only, but allow unstable ones if either
     * the item is the last one left to pack OR
     * the item doesn't fit in the box any other way
     */
    if ($stableOrientations.length > 0) {
      $orientationsToUse = $stableOrientations;
    }
    else if ($unstableOrientations.length > 0) {
      let $orientationsInEmptyBox = this.getPossibleOrientations(
        Item_item,
        OrientatedItem_prevItem,
        Box_box.getInnerWidth(),
        Box_box.getInnerLength(),
        Box_box.getInnerDepth()
      );

      let $stableOrientationsInEmptyBox = $orientationsInEmptyBox.filter($orientation => $orientation.isStable());

      if (null === Item_nextItem || $stableOrientationsInEmptyBox.length === 0) {
        $orientationsToUse = $unstableOrientations;
      }
    }

    return $orientationsToUse;
  }
}
