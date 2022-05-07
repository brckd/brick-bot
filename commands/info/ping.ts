import { CommandTemplate } from "../../handlers"

export default {
    types: ['LEGACY', 'SLASH', 'MESSAGE', 'USER'],
    description: 'Replies with 🏓 *Ping!* and the bot latency',
    
    run: ({ client, reply }) => {
        reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`)
    }
} as CommandTemplate