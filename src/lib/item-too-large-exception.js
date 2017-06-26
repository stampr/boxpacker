/**
 * Class ItemTooLargeException
 * Exception used when an item is too large to pack
 *
 * @package DVDoug\BoxPacker
 */
export class ItemTooLargeException extends Error {
  /**
   * ItemTooLargeException constructor.
   *
   * @param string $message
   * @param Item   $item
   */
  constructor(message, Item_item) {
    super(message);
    this.item = Item_item;
  }

  /**
   * @return Item
   */
  getItem() {
    return this.item;
  }
}
