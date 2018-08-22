const fs = require("fs");
const readline = require("readline");
const ServerHandle = require("../src/ServerHandle");
const Settings = require("../src/settings/Settings");
const { genCommand } = require("../src/commands/CommandList");

const settingsPath = "./settings.json";
const settingsEncoding = "utf-8";

/** @returns {SerializedSettings} */
function readSettings() {
    try {
        if (!fs.existsSync(settingsPath)) return null;
        return JSON.parse(fs.readFileSync(settingsPath, settingsEncoding));
    } catch (e) {
        console.error("caught error while parsing/reading settings.json:", e.stack);
        process.exit(1);
    }
}
/** @param {Settings} settings */
function overwriteSettings(settings) {
    fs.writeFileSync(settingsPath, JSON.stringify(settings.export(), null, 4), "utf-8");
}

let settings = readSettings();

const currentHandle = new ServerHandle();
const logger = require("./log-handler")(currentHandle);

if (settings != null) currentHandle.setSettings(settings);
overwriteSettings(currentHandle.settings);

let commandStreamClosing = false;
const commandStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: "",
    historySize: 64,
    removeHistoryDuplicates: true
});
function ask() {
    if (commandStreamClosing) return;
    commandStream.question("@ ", (input) => {
        setTimeout(ask, 0);
        if (!(input = input.trim())) return;
        logger.printFile(`@ ${input}`);
        if (!currentHandle.commands.execute(null, input))
            logger.warn("unknown command");
    });
}
logger.inform("command stream open");
setTimeout(ask, 1000);
process.once("SIGINT", () => {
    logger.inform("(caught SIGINT)");
    currentHandle.stop();
    process.exitCode = 0;
});

currentHandle.commands.register(
    genCommand({
        name: "exit",
        args: "",
        desc: "stop the handle and close the command stream",
        exec: (handle, context, args) => {
            handle.stop();
            commandStream.close();
            commandStreamClosing = true;
        }
    }),
    genCommand({
        name: "reload",
        args: "",
        desc: "load the settings from file",
        exec: (handle, context, args) => {
            if (!fs.existsSync(settingsPath)) logger.onError(`settings file wasn't found at ${settings}!`);
            handle.setSettings(readSettings());
            logger.print("done");
        }
    }),
    genCommand({
        name: "save",
        args: "",
        desc: "save the settings to file",
        exec: (handle, context, args) => {
            overwriteSettings(handle.settings);
            logger.print("done");
        }
    }),
);

currentHandle.start();
