"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const builders_1 = require("@discordjs/builders");
exports.ping = {
    data: new builders_1.SlashCommandBuilder()
        .setDescription('Sends the bot latency'),
    run: (interaction) => {
        interaction.reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(interaction.client.ws.ping)}**ms`);
    }
};
