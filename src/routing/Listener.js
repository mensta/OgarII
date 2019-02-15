const Server = require("../Server");

class Listener {
    /**
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
        this._running = false;
    }

    get running() { return this._running; }

    /**
     * @abstract
     * @returns {Promise<void>}
     */
    start() { throw new Error("Must be overriden"); }
    /**
     * @abstract
     * @returns {Promise<void>}
     */
    stop() { throw new Error("Must be overriden"); }
}

module.exports = Listener;
