import { SplMaxHeap } from './spl-max-heap.js';

/**
 * List of items to be packed, ordered by volume
 * @author Doug Wright
 * @package BoxPacker
 */
export class ItemList extends SplMaxHeap {
  /**
   * Compare elements in order to place them correctly in the heap while sifting up.
   * @see \SplMaxHeap::compare()
   */
  compare(itemA, itemB) {
    if (itemA.getVolume() < itemB.getVolume()) {
      return 1;
    }
    else if (itemA.getVolume() > itemB.getVolume()) {
      return -1;
    }
    else {
      return itemB.getWeight() - itemA.getWeight();
    }
  }

  /**
   * Get copy of this list as a standard PHP array
   * @return array
   */
  asArray() {
    return this.toArray();
  }
}
