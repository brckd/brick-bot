import { CommandTemplate } from "../../handlers"

export default {
    run: ({ client, message }) => {
        message.reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`)
    }
} as CommandTemplate