import { Message } from "discord.js"
import { IEvent } from "../framework"

export default {
    run: async (client, message: Message) => {
        if (!message.content.startsWith(client.prefix)) return

        switch (message.content.slice(client.prefix.length)) {
            case 'ping':
                message.reply(`🏓 *Pong!*\nBot Latency: **${Math.round(client.ws.ping)}**ms`)
                break
            case 'marco':
                message.reply('Polo!')
                break
        }
    }
} as IEvent