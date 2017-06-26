import { Packer } from './packer.js';
import { PackedBoxList } from './packed-box-list.js';

/**
 * Actual packer
 * @author Doug Wright
 * @package BoxPacker
 */
export class WeightRedistributor
{
  /**
   * Constructor
   */
  constructor($boxList)
  {
    this.boxes = $boxList.clone();
    // this.logger = new NullLogger();
  }

  /**
   * Given a solution set of packed boxes, repack them to achieve optimum weight distribution
   *
   * @param PackedBoxList PackedBoxList_originalBoxes
   * @return PackedBoxList
   */
  redistributeWeight(PackedBoxList_originalBoxes)
  {

    let $targetWeight = PackedBoxList_originalBoxes.getMeanWeight();
    // this.logger.log(LogLevel::DEBUG, "repacking for weight distribution, weight variance {PackedBoxList_originalBoxes.getWeightVariance()}, target weight {$targetWeight}");

    let $packedBoxes = new PackedBoxList;

    let $overWeightBoxes = [];
    let $underWeightBoxes = [];
    PackedBoxList_originalBoxes.forEach($packedBox => {
      let $boxWeight = $packedBox.getWeight();
      if ($boxWeight > $targetWeight) {
        $overWeightBoxes.push($packedBox);
      }
      else if ($boxWeight < $targetWeight) {
        $underWeightBoxes.push($packedBox);
      }
      else {
        $packedBoxes.insert($packedBox); //target weight, so we'll keep these
      }
    });

    let $tryRepack = false;
    do { //Keep moving items from most overweight box to most underweight box
      $tryRepack = false;
      // this.logger.log(LogLevel::DEBUG, 'boxes under/over target: ' . count($underWeightBoxes) . '/' . count($overWeightBoxes));

      let break_three = false;

      for (let [$u,$underWeightBox] of $underWeightBoxes) {
        // this.logger.log(LogLevel::DEBUG, 'Underweight Box ' . $u);
        for (let [$o,$overWeightBox] of $overWeightBoxes) {
          // this.logger.log(LogLevel::DEBUG, 'Overweight Box ' . $o);
          let $overWeightBoxItems = $overWeightBox.getItems().asArray();

          //For each item in the heavier box, try and move it to the lighter one
          for (let [$oi,$overWeightBoxItem] of $overWeightBoxItems) {
            // this.logger.log(LogLevel::DEBUG, 'Overweight Item ' . $oi);
            if ($underWeightBox.getWeight() + $overWeightBoxItem.getWeight() > $targetWeight) {
              // this.logger.log(LogLevel::DEBUG, 'Skipping item for hindering weight distribution');
              continue; //skip if moving this item would hinder rather than help weight distribution
            }

            let $newItemsForLighterBox = $underWeightBox.getItems().clone();
            $newItemsForLighterBox.insert($overWeightBoxItem);

            let $newLighterBoxPacker = new Packer(); //we may need a bigger box
            $newLighterBoxPacker.setBoxes(this.boxes);
            $newLighterBoxPacker.setItems($newItemsForLighterBox);
            // this.logger.log(LogLevel::INFO, "[ATTEMPTING TO PACK LIGHTER BOX]");
            let $newLighterBox = $newLighterBoxPacker.doVolumePacking().extract();

            if ($newLighterBox.getItems().count() === $newItemsForLighterBox.count()) { //new item fits
              // this.logger.log(LogLevel::DEBUG, 'New item fits');
              delete $overWeightBoxItems[$oi]; //now packed in different box

              let $newHeavierBoxPacker = new Packer(); //we may be able to use a smaller box
              $newHeavierBoxPacker.setBoxes(this.boxes);
              $newHeavierBoxPacker.setItems($overWeightBoxItems);

              // this.logger.log(LogLevel::INFO, "[ATTEMPTING TO PACK HEAVIER BOX]");
              let $newHeavierBoxes = $newHeavierBoxPacker.doVolumePacking();
              if ($newHeavierBoxes.length > 1) { //found an edge case in packing algorithm that *increased* box count
                // this.logger.log(LogLevel::INFO, "[REDISTRIBUTING WEIGHT] Abandoning redistribution, because new packing is less efficient than original");
                return PackedBoxList_originalBoxes;
              }

              $overWeightBoxes[$o] = $newHeavierBoxes.extract();
              $underWeightBoxes[$u] = $newLighterBox;

              $tryRepack = true; //we did some work, so see if we can do even better
              $overWeightBoxes.sort($packedBoxes.reverseCompare);
              // usort($overWeightBoxes, [$packedBoxes, 'reverseCompare']);
              $underWeightBoxes.sort($packedBoxes.reverseCompare);
              // usort($underWeightBoxes, [$packedBoxes, 'reverseCompare']);
              break_three = true;
            }
            if (break_three) break;
          }
          if (break_three) break;
        }
        if (break_three) break;
      }
      if (break_three) { // reset
        break_three = false;
      }
    } while ($tryRepack);

    //Combine back into a single list
    $packedBoxes.insertFromArray($overWeightBoxes);
    $packedBoxes.insertFromArray($underWeightBoxes);

    return $packedBoxes;
  }
}
