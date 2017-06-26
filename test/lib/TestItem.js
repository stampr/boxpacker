const Item = require('../../src/lib/item.js').Item;

export class TestItem extends Item
{
    /**
     * TestItem constructor.
     *
     * @param string $description
     * @param int $width
     * @param int $length
     * @param int $depth
     * @param int $weight
     * @param int $keepFlat
     */
    constructor($description, $width, $length, $depth, $weight, $keepFlat)
    {
        super($description, $width, $length, $depth, $weight, $keepFlat);
        this.description = $description;
        this.width = $width;
        this.length = $length;
        this.depth = $depth;
        this.weight = $weight;
        this.keepFlat = $keepFlat;

        this.volume = this.width * this.length * this.depth;
    }

    /**
     * @return string
     */
    getDescription()
    {
        return this.description;
    }

    /**
     * @return int
     */
    getWidth()
    {
        return this.width;
    }

    /**
     * @return int
     */
    getLength()
    {
        return this.length;
    }

    /**
     * @return int
     */
    getDepth()
    {
        return this.depth;
    }

    /**
     * @return int
     */
    getWeight()
    {
        return this.weight;
    }

    /**
     * @return int
     */
    getVolume()
    {
        return this.volume;
    }

    /**
     * @return int
     */
    getKeepFlat()
    {
        return this.keepFlat;
    }
}

