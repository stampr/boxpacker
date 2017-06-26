/**
 * An item to be packed
 * @author Doug Wright
 * @package BoxPacker
 */
export class OrientatedItem {
  /**
   * Constructor.
   * @param Item_item
   * @param int width
   * @param int length
   * @param int depth
   */
  constructor(Item_item, width, length, depth) {
    this.item   = Item_item;
    this.width  = width;
    this.length = length;
    this.depth  = depth;
  }

  /**
   * Item
   *
   * @return Item
   */
  getItem() {
    return this.item;
  }

  /**
   * Item width in mm in it's packed orientation
   *
   * @return int
   */
  getWidth() {
    return this.width;
  }

  /**
   * Item length in mm in it's packed orientation
   *
   * @return int
   */
  getLength() {
    return this.length;
  }

  /**
   * Item depth in mm in it's packed orientation
   *
   * @return int
   */
  getDepth() {
    return this.depth;
  }

  /**
   * Is this orientation stable (low centre of gravity)
   * N.B. Assumes equal weight distribution
   *
   * @return bool
   */
  isStable() {
    return this.getDepth() <= Math.min(this.getLength(), this.getWidth());
  }
}
