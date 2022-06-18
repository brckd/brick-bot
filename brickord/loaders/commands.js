"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = void 0;
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
function loadCommands(client, dir) {
    (0, utils_1.getFiles)(dir !== null && dir !== void 0 ? dir : client.commandsDir).forEach(file => {
        var _a;
        delete require.cache[require.resolve(file)];
        const cmds = require(file);
        for (const c in cmds) {
            const name = ((_a = cmds[c].data.name) !== null && _a !== void 0 ? _a : c === 'default')
                ? path_1.default.basename(file).slice(0, -3)
                : c;
            const cmd = Object.assign(cmds[c], { data: cmds[c].data.setName(name).toJSON() });
            client.commands.set(name, cmd);
        }
    });
}
exports.loadCommands = loadCommands;
