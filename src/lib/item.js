import { mustInherit } from './oop.js';

/**
 * An item to be packed
 * @author Doug Wright
 * @package BoxPacker
 */
export class Item {
  constructor() {
  }

  /**
   * Item SKU etc
   * @return string
   */
  getDescription() {
    mustInherit();
  }

  /**
   * Item width in mm
   * @return int
   */
  getWidth() {
    mustInherit();
  }

  /**
   * Item length in mm
   * @return int
   */
  getLength() {
    mustInherit();
  }

  /**
   * Item depth in mm
   * @return int
   */
  getDepth() {
    mustInherit();
  }

  /**
   * Item weight in g
   * @return int
   */
  getWeight() {
    mustInherit();
  }

  /**
   * Item volume in mm^3
   * @return int
   */
  getVolume() {
    mustInherit();
  }

  /**
   * Does this item need to be kept flat / packed "this way up"?
   * @return bool
   */
  getKeepFlat() {
    mustInherit();
  }
}

export function isItem(object) {
  return object instanceof Item;
}
