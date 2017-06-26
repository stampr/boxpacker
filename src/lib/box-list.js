import { SplMinHeap } from './spl-min-heap.js';

/**
 * List of boxes available to put items into, ordered by volume
 * @author Doug Wright
 * @package BoxPacker
 */
export class BoxList extends SplMinHeap {
  constructor() {
    super();
  }

  /**
   * Compare elements in order to place them correctly in the heap while sifting up.
   * @see \SplMinHeap::compare()
   */
  compare(boxA, boxB) {
    if (boxB.getInnerVolume() < boxA.getInnerVolume()) {
      return 1;
    }
    else if (boxB.getInnerVolume() > boxA.getInnerVolume()) {
      return -1;
    }
    else {
      return 0;
    }
  }
}
