import { Item } from './item.js';
import { mustInherit } from './oop.js';

/**
 * An item to be packed where additional constraints need to be considered. Only implement this interface if you actually
 * need this additional functionality as it will slow down the packing algorithm
 * @author Doug Wright
 * @package BoxPacker
 */
export class ConstrainedItem extends Item {
  constructor() {
    super();
  }

  /**
   * Hook for user implementation of item-specific constraints, e.g. max <x> batteries per box
   *
   * @param ItemList $alreadyPackedItems
   * @param Box      $box
   *
   * @return bool
   */
  canBePackedInBox(ItemList_alreadyPackedItems, Box_box) {
    mustInherit();
  }

}
