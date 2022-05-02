import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class Ping extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name:'ping',
            aliases: ['pong'],
            description: 'Replies with the bot latency'
        })
    }

    public async messageRun(message: Message) {
        await message.channel.send(`🏓 *Pong!*\nBot Latency: **${Math.round(this.container.client.ws.ping)}**ms`)
      }
}