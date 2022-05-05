import { CommandTemplate } from "../../handlers"

export default {
    description: 'Replies with 🏓 *Ping!* and the bot latency',
    slash: 'both',
    
    run: ({ client, reply }) => {
        reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`)
    }
} as CommandTemplate