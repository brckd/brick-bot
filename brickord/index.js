"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const path_1 = __importDefault(require("path"));
const commands_1 = require("./loaders/commands");
const events_1 = require("./loaders/events");
const root = path_1.default.dirname(require.main.filename);
class Client extends discord_js_1.default.Client {
    constructor(options) {
        var _a, _b, _c, _d, _e;
        super(options);
        this.prefix = options.prefix instanceof Array ? (_a = options.prefix) !== null && _a !== void 0 ? _a : ['!'] : [(_b = options.prefix) !== null && _b !== void 0 ? _b : '!'];
        this.color = options.color;
        this.owners = (_c = options.owners) !== null && _c !== void 0 ? _c : [];
        this.testGuilds = options.testGuilds;
        this.eventsDir = (_d = options.eventsDir) !== null && _d !== void 0 ? _d : path_1.default.join(root, 'events');
        this.events = new discord_js_1.default.Collection();
        this.loadEvents = (dir) => (0, events_1.loadEvents)(this, dir);
        this.loadEvents();
        this.loadEvents(path_1.default.join(__dirname, 'events'));
        this.commandsDir = (_e = options.commandsDir) !== null && _e !== void 0 ? _e : path_1.default.join(root, 'commands');
        this.commands = new discord_js_1.default.Collection();
        this.loadCommands = (dir) => (0, commands_1.loadCommands)(this, dir);
        this.loadCommands();
    }
}
exports.Client = Client;
