import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatCommandData } from '../brickord'

export const ping = {
    data: new SlashCommandBuilder()
        .setDescription('Sends the bot latency'),
    run: (interaction) => {
        interaction.reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(interaction.client.ws.ping)}**ms`)
    }
} as ChatCommandData