"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = exports.getChannel = exports.getMember = exports.getBoolean = void 0;
const optionTypes = [undefined, 'subcommand', 'subcommand group', 'string', 'integer', 'boolean', 'member', 'channel', 'role', 'mentionable', 'number', 'attachment'];
exports.default = {
    name: 'messageCreate',
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (message.author.bot)
            return;
        let prefix = client.prefix.find((prefix) => typeof (prefix) === 'string'
            ? message.content.startsWith(prefix)
            : message.content.search(prefix));
        if (!prefix)
            return;
        const options = message.content.replace(prefix, '').trim().split(/ +/g);
        const name = (_a = options.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        let command = client.commands.get(name);
        const attachments = message.attachments.toJSON();
        try {
            if (!command)
                throw new Error(`Command not found: ${name}`);
            if (!command.data.options)
                return command.run(message);
            const args = yield Promise.all(command.data.options.map((option, i) => __awaiter(void 0, void 0, void 0, function* () {
                const query = options[i];
                const arg = yield (() => __awaiter(void 0, void 0, void 0, function* () {
                    var _b;
                    switch (option.type) {
                        case 3: return query;
                        case 4: return parseInt(query);
                        case 5: return getBoolean(query);
                        case 6: return yield getMember(message, query);
                        case 7: return getChannel(message, query);
                        case 8: return getRole(message, query);
                        case 9: return (_b = getRole(message, query)) !== null && _b !== void 0 ? _b : yield getMember(message, query);
                        case 10: return parseFloat(query);
                        case 11: return attachments.shift();
                    }
                }))();
                if (arg === undefined || arg === null) {
                    throw new Error(`Couldn't convert \`${query}\` to ${optionTypes[option.type]}`);
                }
                return arg;
            })));
            command.run(message, ...args);
        }
        catch (err) {
            if (err instanceof Error)
                client.emit('commandError', message, err);
            else
                console.error(err);
        }
    })
};
function getBoolean(query) {
    return ['true', 'yes'].includes(query.toLowerCase())
        ? true
        : ['false', 'no'].includes(query.toLowerCase())
            ? false
            : undefined;
}
exports.getBoolean = getBoolean;
function getMember(message, query) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        return (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(query.replace(/\D+/g, ''))) !== null && _b !== void 0 ? _b : (_d = (yield ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.search({ query: query, limit: 1 })))) === null || _d === void 0 ? void 0 : _d.first();
    });
}
exports.getMember = getMember;
function getChannel(message, query) {
    var _a, _b, _c;
    return (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(query.replace(/\D+/g, ''))) !== null && _b !== void 0 ? _b : (_c = message.guild) === null || _c === void 0 ? void 0 : _c.channels.cache.find(c => c.name === query.replace(/[^A-Za-z0-9-]+/g, '').toLowerCase());
}
exports.getChannel = getChannel;
function getRole(message, query) {
    var _a, _b, _c;
    return (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.get(query.replace(/\D+/g, ''))) !== null && _b !== void 0 ? _b : (_c = message.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.find(r => r.name.toLowerCase() === query.replace(/[^A-Za-z0-9]+/g, '').toLowerCase());
}
exports.getRole = getRole;
