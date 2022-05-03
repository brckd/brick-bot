import { SlashCommandTemplate } from "../handlers";

export default {
    name: 'ping',
    description: 'Replies with 🏓 *Ping!* and the bot latency',
    run: ({ client, interaction }) => {
        interaction.reply({
            content: `> 🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`,
            ephemeral: true
        })
    }
} as SlashCommandTemplate