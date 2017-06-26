import { ItemList } from './item-list.js';
import { WeightRedistributor } from './weight-redistributor.js';
import { BoxList } from './box-list.js';
import { PackedBoxList } from './packed-box-list.js';
import { VolumePacker } from './volume-packer.js';
import { ItemTooLargeException } from './item-too-large-exception.js';

const MAX_BOXES_TO_BALANCE_WEIGHT = 12;

/**
 * Actual packer
 * @author Doug Wright
 * @package BoxPacker
 */
export class Packer {
  /**
   * Constructor
   */
  constructor() {
    this.items = new ItemList();
    this.boxes = new BoxList();

    // this.logger = new NullLogger();
  }

  /**
   * Add item to be packed
   * @param Item_item
   * @param int  $qty
   */
  addItem(Item_item, $qty) {
    if (undefined === $qty) $qty = 1;
    for (let $i = 0; $i < $qty; $i++) {
      this.items.insert(Item_item);
    }
    // this.logger.log(LogLevel::INFO, "added {$qty} x {Item_item.getDescription()}");
  }

  /**
   * Set a list of items all at once
   * @param \Traversable|array Item_items
   */
  setItems(Item_items) {
    if (Item_items instanceof ItemList) {
      this.items = Item_items.clone();
    }
    else {
      this.items = new ItemList();
      Item_items.forEach(item => this.items.insert(item));
    }
  }

  /**
   * Add box size
   * @param Box $box
   */
  addBox($box) {
    this.boxes.insert($box);
    // this.logger.log(LogLevel::INFO, "added box {$box.getReference()}");
  }

  /**
   * Add a pre-prepared set of boxes all at once
   * @param BoxList $boxList
   */
  setBoxes($boxList) {
    this.boxes = $boxList.clone();
  }

  /**
   * Pack items into boxes
   *
   * @return PackedBoxList
   */
  pack() {
    let $packedBoxes = this.doVolumePacking();

    //If we have multiple boxes, try and optimise/even-out weight distribution
    if ($packedBoxes.count() > 1 && $packedBoxes.count() < MAX_BOXES_TO_BALANCE_WEIGHT) {
      let $redistributor = new WeightRedistributor(this.boxes);
      // $redistributor.setLogger(this.logger);
      $packedBoxes = $redistributor.redistributeWeight($packedBoxes);
    }

    // this.logger.log(LogLevel::INFO, "packing completed, {$packedBoxes.count()} boxes");
    return $packedBoxes;
  }

  /**
   * Pack items into boxes using the principle of largest volume item first
   *
   * @throws ItemTooLargeException
   * @return PackedBoxList
   */
  doVolumePacking() {

    let $packedBoxes = new PackedBoxList;

    //Keep going until everything packed
    while (this.items.count()) {
      let $boxesToEvaluate = this.boxes.clone();
      let $packedBoxesIteration = new PackedBoxList;

      //Loop through boxes starting with smallest, see what happens
      while (!$boxesToEvaluate.isEmpty()) {
        let $box = $boxesToEvaluate.extract();

        let $volumePacker = new VolumePacker($box, this.items.clone());
        // $volumePacker.setLogger(this.logger);
        let $packedBox = $volumePacker.pack();
        if ($packedBox.getItems().count()) {
          $packedBoxesIteration.insert($packedBox);

          //Have we found a single box that contains everything?
          if ($packedBox.getItems().count() === this.items.count()) {
            break;
          }
        }
      }

      //Check iteration was productive
      if ($packedBoxesIteration.isEmpty()) {
        throw new ItemTooLargeException('Item ' + this.items.top().getDescription() + ' is too large to fit into any box', this.items.top());
      }

      //Find best box of iteration, and remove packed items from unpacked list
      let $bestBox = $packedBoxesIteration.top();
      let $unPackedItems = this.items.asArray();
      $bestBox.getItems().toArray().forEach($packedItem => {
        for (let [$unpackedKey,$unpackedItem] of $unPackedItems) {
          if ($packedItem === $unpackedItem) {
            delete $unPackedItems[$unpackedKey];
            break;
          }
        }
      });
      let $unpackedItemList = new ItemList();
      for (let [$unpackedItem] of $unPackedItems) {
        $unpackedItemList.insert($unpackedItem);
      }
      this.items = $unpackedItemList;
      $packedBoxes.insert($bestBox);

    }

    return $packedBoxes;
  }
}
