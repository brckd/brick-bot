import { CommandTemplate } from "../../handlers"

export default {
    description: 'Replies with 🏓 *Ping!* and the bot latency',
    slash: 'both',
    
    run: ({ client, reply }) => {
        reply({
            content: `> 🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`,
            ephemeral: true
        })
    }
} as CommandTemplate