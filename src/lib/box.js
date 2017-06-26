import { mustInherit } from './oop.js';

/**
 * A "box" (or envelope?) to pack items into
 * @author Doug Wright
 * @package BoxPacker
 */
export class Box
{
  constructor() {

  }

  /**
   * Reference for box type (e.g. SKU or description)
   * @return string
   */
  getReference() {
    mustInherit();
  }

  /**
   * Outer width in mm
   * @return int
   */
  getOuterWidth() {
    mustInherit();
  }

  /**
   * Outer length in mm
   * @return int
   */
  getOuterLength() {
    mustInherit();
  }

  /**
   * Outer depth in mm
   * @return int
   */
  getOuterDepth() {
    mustInherit();
  }

  /**
   * Empty weight in g
   * @return int
   */
  getEmptyWeight() {
    mustInherit();
  }

  /**
   * Inner width in mm
   * @return int
   */
  getInnerWidth() {
    mustInherit();
  }

  /**
   * Inner length in mm
   * @return int
   */
  getInnerLength() {
    mustInherit();
  }

  /**
   * Inner depth in mm
   * @return int
   */
  getInnerDepth() {
    mustInherit();
  }

  /**
   * Total inner volume of packing in mm^3
   * @return int
   */
  getInnerVolume() {
    mustInherit();
  }

  /**
   * Max weight the packaging can hold in g
   * @return int
   */
  getMaxWeight() {
    mustInherit();
  }
}

export function isBox(object) {
  return object instanceof Box;
}
