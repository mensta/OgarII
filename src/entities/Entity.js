const World = require("../worlds/World");

class Entity {
    /**
     * @param {World} world
     * @param {Scale} x
     * @param {Scale} y
     */
    constructor(world, x, y) {
        this.world = world;
        this.x = x;
        this.y = y;
        /** @type {Rect} */
        this.range = this.updateRange();
    }

    get server() { return this.world.server; }

    /**
     * @abstract
     * @returns {CellType}
     */
    get type() { throw new Error("Must be overriden"); }

    /**
     * @abstract
     * @returns {Rect}
     */
    updateRange() { throw new Error("Must be overriden"); }
}

module.exports = Entity;
