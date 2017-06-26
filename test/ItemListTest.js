'use strict';

const ItemList = require('../src/lib/item-list.js').ItemList;

const TestItem = require('./lib/TestItem.js').TestItem;

describe('ItemListTest', function() {
  it('testCompare', function() {
    let $box1 = new TestItem('Small', 20, 20, 2, 100, true);
    let $box2 = new TestItem('Large', 200, 200, 20, 1000, true);
    let $box3 = new TestItem('Medium', 100, 100, 10, 500, true);

    let $list = new ItemList;
    $list.insert($box1);
    $list.insert($box2);
    $list.insert($box3);

    let $sorted = [];
    while (!$list.isEmpty()) {
        $sorted.push($list.extract());
    }
    expect($sorted).toEqual([$box2, $box3, $box1]);
  });
});

