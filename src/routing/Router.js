const Server = require("../Server");

class Router {
    /**
     * @param {Server} server
     */
    constructor(server) {
        this.server = server;
        /** @type {Timestamp} */
        this.disconnectTime = null;

        /** @type {Point} */
        this.mouse = { x: 0, y: 0 };
    }

    get disconnected() { return this.disconnectTime != null; }
    /**
     * @abstract
     * @returns {Promise<void>}
     */
    set onmessage() { throw new Error("Must be overriden"); }

    /**
     * @abstract
     * @returns {Promise<void>}
     */
    disconnect() { throw new Error("Must be overriden"); }
}

module.exports = Router;
