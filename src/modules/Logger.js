const util = require("util");

/**
 * @param {LogMessageData} message
 */
function formatMessage() {
    return util.format.apply(null, ...message);
}

class Logger {
    constructor() {
        /** @type {LogEventHandler[]} */
        this.listeners = [];

        /** @type {LogEventHandler} */
        this._onlog = (date, level, message) => {
            for (let i = 0, l = this.listeners.length; i < l; i++)
                this.listeners[i](date, level, message);
        };
    }

    get onlog() { return this._onlog; }
    /**
     * @param {LogEventHandler} value
     */
    set onlog(value) { this.listeners.push(value); }

    /**
     * @param {LogMessageData} message
     */
    print(...message) {
        this._onlog(new Date(), "PRINT", formatMessage(message));
    }
    /**
     * @param {LogMessageData} message
     */
    printFile(...message) {
        this._onlog(new Date(), "FILE", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    debug(...message) {
        this._onlog(new Date(), "DEBUG", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    onAccess(...message) {
        this._onlog(new Date(), "ACCESS", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    inform(...message) {
        this._onlog(new Date(), "INFO", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    warn(...message) {
        this._onlog(new Date(), "WARN", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    onError(...message) {
        this._onlog(new Date(), "ERROR", formatMessage(message));
    }

    /**
     * @param {LogMessageData} message
     */
    onFatal(...message) {
        this._onlog(new Date(), "FATAL", formatMessage(message));
    }
}

module.exports = Logger;
