const Entity = require("../entities/Entity");
const Server = require("../Server");
const World = require("../worlds/World");

class Player {
    /**
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;

        this.inWorld = false;
        this.world = null;


    }
}

module.exports = Player;
