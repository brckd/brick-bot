"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEvents = void 0;
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
function loadEvents(client, dir) {
    (0, utils_1.getFiles)(dir !== null && dir !== void 0 ? dir : client.eventsDir).forEach(file => {
        var _a;
        delete require.cache[require.resolve(file)];
        const event = require(file).default;
        const filename = path_1.default.basename(file).slice(0, -3);
        const name = ((_a = event.name) !== null && _a !== void 0 ? _a : filename);
        if (!client.events.has(filename))
            client.on(name, (...args) => { var _a; return (_a = client.events.get(filename)) === null || _a === void 0 ? void 0 : _a.run(client, ...args); });
        client.events.set(filename, event);
    });
}
exports.loadEvents = loadEvents;
