import { SplMinHeap } from './spl-min-heap.js';

/**
 * List of possible packed box choices, ordered by utilisation (item count, volume)
 * @author Doug Wright
 * @package BoxPacker
 */
export class PackedBoxList extends SplMinHeap
{
  constructor() {
    super();
    this.meanWeight = null;
  }

  /**
   * Compare elements in order to place them correctly in the heap while sifting up.
   * @see \SplMinHeap::compare()
   */
  compare($boxA, $boxB) {
    let $choice = $boxA.getItems().count() - $boxB.getItems().count();
    if ($choice === 0) {
      $choice = $boxB.getBox().getInnerVolume() - $boxA.getBox().getInnerVolume();
    }
    if ($choice === 0) {
      $choice = $boxA.getWeight() - $boxB.getWeight();
    }
    return $choice;
  }

  /**
   * Reversed version of compare
   * @return int
   */
  reverseCompare($boxA, $boxB) {
    let $choice = $boxB.getItems().count() - $boxA.getItems().count();
    if ($choice === 0) {
      $choice = $boxA.getBox().getInnerVolume() - $boxB.getBox().getInnerVolume();
    }
    if ($choice === 0) {
      $choice = $boxB.getWeight() - $boxA.getWeight();
    }
    return $choice;
  }

  /**
   * Calculate the average (mean) weight of the boxes
   * @return float
   */
  getMeanWeight() {
    if (null !== this.meanWeight) {
      return this.meanWeight;
    }

    let boxes = this.toArray();
    this.meanWeight = 0;
    boxes.forEach(box => {
      let weight = box.getWeight();
      console.log('getMeanWeight; weight', box, weight);
      this.meanWeight += weight;
    });
    console.log('getMeanWeight; this.meanWeight', this.meanWeight);

    return this.meanWeight /= this.count();
  }

  /**
   * Calculate the variance in weight between these boxes
   * @return float
   */
  getWeightVariance() {
    let $mean = this.getMeanWeight();
    console.log('getWeightVariance; mean', $mean);

    let $weightVariance = 0;

    let boxes = this.toArray();
    boxes.forEach(box => {
      let variance = Math.pow(box.getWeight() - $mean, 2);
      console.log('getWeightVariance; variance', variance);
      $weightVariance += variance;
    });
    console.log('getWeightVariance; count', this.count());
    return $weightVariance / this.count();
  }

  /**
   * Get volume utilisation of the set of packed boxes
   * @return float
   */
  getVolumeUtilisation() {
    let $itemVolume = 0;
    let $boxVolume = 0;

    let boxes = this.toArray();
    boxes.forEach(box => {
      $boxVolume += box.getBox().getInnerVolume();
      box.getItems().toArray().forEach(item => {
        $itemVolume += item.getVolume();
      });
    });

    // FIXME: precision is not maintained
    // return round($itemVolume / $boxVolume * 100, 1);
    return Math.round($itemVolume / $boxVolume * 100);
  }

  /**
   * Do a bulk insert
   * @param array boxes
   */
  insertFromArray(boxes) {
    boxes.forEach(box => this.insert(box));
  }
}
