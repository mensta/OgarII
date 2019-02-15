const Server = require("../Server");

const WorldSettings = require("../settings/WorldSettings");

class World {
    /**
     * @param {Server} server
     * @param {WorldSettings} settings
     */
    constructor(server, settings) {
        this.server = server;
        this.settings = settings;

        this.open = false;
        this.frozen = false;

        this.finder = new QuadTree()
        this.entities = { };

        this.tick = 0;
    }

    /**
     * @param {Player} player
     */
    addPlayer(player) {

    }
    /**
     * @param {Player} player
     */
    removePlayer(player) {

    }

    onTick() {

    }
}

module.exports = World;
