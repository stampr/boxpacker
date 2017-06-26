const Box = require('../../src/lib/box.js').Box;

export class TestBox extends Box
{
    constructor(
        $reference,
        $outerWidth,
        $outerLength,
        $outerDepth,
        $emptyWeight,
        $innerWidth,
        $innerLength,
        $innerDepth,
        $maxWeight
    ) {
        super($reference,
          $outerWidth,
          $outerLength,
          $outerDepth,
          $emptyWeight,
          $innerWidth,
          $innerLength,
          $innerDepth,
          $maxWeight);
        this.reference = $reference;
        this.outerWidth = $outerWidth;
        this.outerLength = $outerLength;
        this.outerDepth = $outerDepth;
        this.emptyWeight = $emptyWeight;
        this.innerWidth = $innerWidth;
        this.innerLength = $innerLength;
        this.innerDepth = $innerDepth;
        this.maxWeight = $maxWeight;
        this.innerVolume = this.innerWidth * this.innerLength * this.innerDepth;
    }

    /**
     * @return string
     */
    getReference()
    {
        return this.reference;
    }

    /**
     * @return int
     */
    getOuterWidth()
    {
        return this.outerWidth;
    }

    /**
     * @return int
     */
    getOuterLength()
    {
        return this.outerLength;
    }

    /**
     * @return int
     */
    getOuterDepth()
    {
        return this.outerDepth;
    }

    /**
     * @return int
     */
    getEmptyWeight()
    {
        return this.emptyWeight;
    }

    /**
     * @return int
     */
    getInnerWidth()
    {
        return this.innerWidth;
    }

    /**
     * @return int
     */
    getInnerLength()
    {
        return this.innerLength;
    }

    /**
     * @return int
     */
    getInnerDepth()
    {
        return this.innerDepth;
    }

    /**
     * @return int
     */
    getInnerVolume()
    {
        return this.innerVolume;
    }

    /**
     * @return int
     */
    getMaxWeight()
    {
        return this.maxWeight;
    }
}
