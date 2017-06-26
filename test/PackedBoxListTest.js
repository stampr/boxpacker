'use strict';

const ItemList = require('../src/lib/item-list.js').ItemList;
const PackedBoxList = require('../src/lib/packed-box-list.js').PackedBoxList;
const PackedBox = require('../src/lib/packed-box.js').PackedBox;

const TestBox = require('./lib/TestBox.js').TestBox;
const TestItem = require('./lib/TestItem.js').TestItem;

describe('PackedBoxListTest', function() {
  it('testVolumeUtilisation', function() {
    let $box = new TestBox('Box', 10, 10, 10, 10, 10, 10, 10, 10);
    let $item = new TestItem('Item', 5, 10, 10, 10, true);

    let $boxItems = new ItemList();
    $boxItems.insert($item);

    let $packedBox = new PackedBox($box, $boxItems, 1, 2, 3, 4, 0, 0, 0);

    let $packedBoxList = new PackedBoxList();
    $packedBoxList.insert($packedBox);

    assert.strictEqual(50, $packedBoxList.getVolumeUtilisation());
  });
  it('testWeightVariance', function() {
    let $box = new TestBox('Box', 10, 10, 10, 10, 10, 10, 10, 10);
    let $item = new TestItem('Item', 5, 10, 10, 10, true);

    let $boxItems = new ItemList();
    $boxItems.insert($item);

    let $packedBox = new PackedBox($box, $boxItems, 1, 2, 3, 4, 0, 0, 0);

    let $packedBoxList = new PackedBoxList();
    $packedBoxList.insert($packedBox);

    assert.strictEqual(0, $packedBoxList.getWeightVariance());
  });
});

