import Heap from 'heap';

import { mustInherit, notImplemented } from './oop.js';

export class SplHeap {
  constructor() {
    this.heap = new Heap(this.compare);
  }

  // abstract protected int compare ( mixed $value1 , mixed $value2 )
  compare(value1, value2) {
    mustInherit();
  }

  // public int SplHeap::count ( void )
  count() {
    return this.heap.size();
  }

  // public mixed SplHeap::current ( void )
  current() {
    notImplemented();
  }

  // public mixed SplHeap::extract ( void )
  extract() {
    return this.heap.pop();
  }

  // public void SplHeap::insert ( mixed $value )
  insert(value) {
    this.heap.insert(value);
  }

  // public bool SplHeap::isEmpty ( void )
  isEmpty() {
    return this.heap.empty();
  }

  // public mixed SplHeap::key ( void )
  key() {
    notImplemented();
  }

  // public void SplHeap::next ( void )
  next() {
    notImplemented();
  }

  // public void SplHeap::recoverFromCorruption ( void )
  recoverFromCorruption() {
    this.heap.heapify();
  }

  // public void SplHeap::rewind ( void )
  rewind() {
    notImplemented();
  }

  // public mixed SplHeap::top ( void )
  top() {
    return this.heap.top;
  }

  // public bool SplHeap::valid ( void )
  valid() {
    return this.heap.count() > 0;
  }

  clone() {
    return this.heap.clone();
  }

  toArray() {
    return this.heap.toArray();
  }
}
