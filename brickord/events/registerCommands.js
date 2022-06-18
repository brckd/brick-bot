"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'ready',
    run: (client) => {
        var _a, _b;
        const commands = [...client.commands.values()].map(c => c.data);
        (_a = client.testGuilds) === null || _a === void 0 ? void 0 : _a.forEach(guild => {
            var _a;
            (_a = client.guilds.cache.get(guild)) === null || _a === void 0 ? void 0 : _a.commands.set(commands);
        });
        (_b = client.application) === null || _b === void 0 ? void 0 : _b.commands.set(client.testGuilds ? [] : commands);
    }
};
