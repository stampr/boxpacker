import { SplHeap } from './spl-heap.js';

export class SplMaxHeap extends SplHeap {
  constructor() {
    super();
  }

  compare(value1, value2) {
    return value1 > value2;
  }
}
