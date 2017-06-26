'use strict';

const BoxList = require('../src/lib/box-list.js').BoxList;

const TestBox = require('./lib/TestBox.js').TestBox;

describe('BoxListTest', function() {

// <?php
// /**
//  * Box packing (3D bin packing, knapsack problem)
//  * @package BoxPacker
//  * @author Doug Wright
//  */

// namespace DVDoug\BoxPacker;

// use DVDoug\BoxPacker\Test\TestBox;
// use PHPUnit\Framework\TestCase;

// class BoxListTest extends TestCase
// {

  it('testCompare', function() {
//     function testCompare()
//     {

//         $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
//         $box2 = new TestBox('Large', 201, 201, 21, 1, 200, 200, 20, 1000);
//         $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);

//         $list = new BoxList;
//         $list->insert($box1);
//         $list->insert($box2);
//         $list->insert($box3);

//         $sorted = [];
//         while (!$list->isEmpty()) {
//             $sorted[] = $list->extract();
//         }
//         self::assertEquals(array($box1, $box3, $box2), $sorted);
//     }

    let $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
    let $box2 = new TestBox('Large', 201, 201, 21, 1, 200, 200, 20, 1000);
    let $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);
    let $list = new BoxList;
    $list.insert($box1);
    $list.insert($box2);
    $list.insert($box3);
    let $sorted = [];
    while (!$list.isEmpty()) {
        $sorted.push($list.extract());
    }
    expect($sorted).toEqual([$box1, $box3, $box2]);
  });

  it('testCompare', function() {
//     function testIssue14A()
//     {
//         $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
//         $box2 = new TestBox('Large', 1301, 1301, 1301, 1, 1300, 1300, 1300, 1000);
//         $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);
//         $list = new BoxList;
//         $list->insert($box1);
//         $list->insert($box2);
//         $list->insert($box3);
//         $sorted = [];
//         while (!$list->isEmpty()) {
//             $sorted[] = $list->extract();
//         }
//         self::assertEquals(array($box1, $box3, $box2), $sorted);
//     }
      let $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
      let $box2 = new TestBox('Large', 1301, 1301, 1301, 1, 1300, 1300, 1300, 1000);
      let $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);
      let $list = new BoxList;
      $list.insert($box1);
      $list.insert($box2);
      $list.insert($box3);
      let $sorted = [];
      while (!$list.isEmpty()) {
          $sorted.push($list.extract());
      }
      expect($sorted).toEqual([$box1, $box3, $box2]);
    });

  it('testCompare', function() {
//     function testIssue14B()
//     {
//         $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
//         $box2 = new TestBox('Large', 1301, 1301, 1301, 1, 1300, 1300, 1300, 1000);
//         $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);
//         $list = new BoxList;
//         $list->insert($box3);
//         $list->insert($box2);
//         $list->insert($box1);
//         $sorted = [];
//         while (!$list->isEmpty()) {
//             $sorted[] = $list->extract();
//         }
//         self::assertEquals(array($box1, $box3, $box2), $sorted);
//         $list = new BoxList;
//         $list->insert($box2);
//         $list->insert($box1);
//         $list->insert($box3);
//         $sorted = [];
//         while (!$list->isEmpty()) {
//             $sorted[] = $list->extract();
//         }
//         self::assertEquals(array($box1, $box3, $box2), $sorted);
//     }
    let $box1 = new TestBox('Small', 21, 21, 3, 1, 20, 20, 2, 100);
    let $box2 = new TestBox('Large', 1301, 1301, 1301, 1, 1300, 1300, 1300, 1000);
    let $box3 = new TestBox('Medium', 101, 101, 11, 5, 100, 100, 10, 500);
    let $list1 = new BoxList;
    $list1.insert($box3);
    $list1.insert($box2);
    $list1.insert($box1);
    let $sorted1 = [];
    while (!$list1.isEmpty()) {
        $sorted1.push($list1.extract());
    }
    expect($sorted1).toEqual([$box1, $box3, $box2]);
    let $list2 = new BoxList;
    $list2.insert($box2);
    $list2.insert($box1);
    $list2.insert($box3);
    let $sorted2 = [];
    while (!$list2.isEmpty()) {
        $sorted2.push($list2.extract());
    }
    expect($sorted2).toEqual([$box1, $box3, $box2]);
  });
// }
});

