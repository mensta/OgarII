const World = require("./worlds/World");
const Modules = {
    Constants: require("./modules/Constants"),
    QuadTree: require("./modules/QuadTree"),
    Logger: require("./modules/Logger"),
    Reader: require("./modules/Reader"),
    Writer: require("./modules/Writer")
};

const ServerSettings = require("./settings/ServerSettings");


class Server {
    /**
     * @param {ServerSettings} settings
     */
    constructor(settings) {
        this.settings = settings;
        /** @type {Indexed<World>} */
        this.worlds = { };
    }

    static get modules() { return Modules; }
    get modules() { return Modules; }
}

module.exports = Server;
