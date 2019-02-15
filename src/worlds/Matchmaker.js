const Server = require("../Server");

class Matchmaker {
    /**
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
    }
}

module.exports = Matchmaker;
