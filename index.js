"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brickord_1 = require("./brickord");
require("dotenv/config");
const client = new brickord_1.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES'
    ],
    partials: [
        'CHANNEL'
    ],
    allowedMentions: { users: [], roles: [], repliedUser: false },
    prefix: process.env.PREFIX
});
client.login(process.env.TOKEN);
