const TestItem = require('./TestItem.js').TestItem;

const LIMIT = 3;

export class TestConstrainedTestItem extends TestItem
{
  constructor() {
    super();
  }

  /**
   * @param ItemList $alreadyPackedItems
   * @param TestBox  $box
   *
   * @return bool
   */
  canBePackedInBox($alreadyPackedItems, $box)
  {
      $alreadyPackedType = $alreadyPackedItems.asArray().filter($item => {
        return $item.getDescription() === this.getDescription();
      });

      return ($alreadyPackedType.length + 1) <= LIMIT;
  }
}
