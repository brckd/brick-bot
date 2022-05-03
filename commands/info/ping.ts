import { ICommand } from "../../handlers"

export default {
    run: async ({ client, message }) => {
        message.reply(`🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`)
    }
} as ICommand