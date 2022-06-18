"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.channel = exports.mention = exports.echo = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const builders_1 = require("@discordjs/builders");
exports.echo = {
    data: new builders_1.SlashCommandBuilder()
        .setDescription('Sends the passed text')
        .addStringOption(option => option
        .setName('text')
        .setDescription('The text to send')
        .setRequired(true)),
    run: (interaction, text) => {
        var _a;
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send(text);
        if (interaction instanceof discord_js_1.default.CommandInteraction)
            interaction.reply({
                content: 'Message has been send',
                ephemeral: true
            });
    }
};
exports.mention = {
    data: new builders_1.SlashCommandBuilder()
        .setDescription('Mentions a user or role')
        .addMentionableOption(option => option
        .setName('mentionable')
        .setDescription('The user or role to mention')
        .setRequired(true)),
    run: (interaction, mention) => {
        interaction.reply(mention.toString());
    }
};
exports.channel = {
    data: new builders_1.SlashCommandBuilder()
        .setDescription('Tags a channel')
        .addChannelOption(option => option
        .setName('channel')
        .setDescription('The channel to tag')
        .setRequired(true)),
    run: (interaction, channel) => {
        interaction.reply(channel.toString());
    }
};
