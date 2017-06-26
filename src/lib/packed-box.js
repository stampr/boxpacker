
/**
 * A "box" with items
 * @author Doug Wright
 * @package BoxPacker
 */
export class PackedBox {
  /**
   * Constructor
   *
   * @param Box      Box_box
   * @param ItemList_itemList
   * @param int      $remainingWidth
   * @param int      $remainingLength
   * @param int      $remainingDepth
   * @param int      $remainingWeight
   * @param int      $usedWidth
   * @param int      $usedLength
   * @param int      $usedDepth
   */
  constructor(
    Box_box,
    ItemList_itemList,
    $remainingWidth,
    $remainingLength,
    $remainingDepth,
    $remainingWeight,
    $usedWidth,
    $usedLength,
    $usedDepth
  ) {
    this.box = Box_box;
    this.items = ItemList_itemList;
    this.remainingWidth = $remainingWidth;
    this.remainingLength = $remainingLength;
    this.remainingDepth = $remainingDepth;
    this.remainingWeight = $remainingWeight;
    this.usedWidth = $usedWidth;
    this.usedLength = $usedLength;
    this.usedDepth = $usedDepth;
  }

  /**
   * Get box used
   * @return Box
   */
  getBox() {
    return this.box;
  }

  /**
   * Get items packed
   * @return ItemList
   */
  getItems() {
    return this.items;
  }

  /**
   * Get packed weight
   * @return int weight in grams
   */
  getWeight() {
    if (null !== this.weight) {
      return this.weight;
    }
    this.weight = this.box.getEmptyWeight();
    console.log('packed-box; this.weight', this.weight);
    this.items.forEach(item => {
      console.log('packed-box; item.getWeight()', item.getWeight());
      this.weight += item.getWeight();
    });
    return this.weight;
  }

  /**
   * Get remaining width inside box for another item
   * @return int
   */
  getRemainingWidth() {
    return this.remainingWidth;
  }

  /**
   * Get remaining length inside box for another item
   * @return int
   */
  getRemainingLength() {
    return this.remainingLength;
  }

  /**
   * Get remaining depth inside box for another item
   * @return int
   */
  getRemainingDepth() {
    return this.remainingDepth;
  }

  /**
   * Used width inside box for packing items
   * @return int
   */
  getUsedWidth() {
    return this.usedWidth;
  }

  /**
   * Used length inside box for packing items
   * @return int
   */
  getUsedLength() {
    return this.usedLength;
  }

  /**
   * Used depth inside box for packing items
   * @return int
   */
  getUsedDepth() {
    return this.usedDepth;
  }

  /**
   * Get remaining weight inside box for another item
   * @return int
   */
  getRemainingWeight() {
    return this.remainingWeight;
  }

  /**
   * Get volume utilisation of the packed box
   * @return float
   */
  getVolumeUtilisation() {
    let $itemVolume = 0;

    /** @var Item $item */
    this.items.forEach(item => $itemVolume += item.getVolume());

    // return round($itemVolume / this.box.getInnerVolume() * 100, 1);
    // FIXME: this doesn't maintain the same percision
    return Math.round($itemVolume / this.box.getInnerVolume() * 100);
  }
}
