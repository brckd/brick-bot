import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class Ping extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, {
            ...options,
            name:'ping',
            aliases: ['pong'],
            description: 'Replies with the bot latency',
            preconditions: ['OwnerOnly']
        })
    }

    public async messageRun(message: Message) {
        await message.reply(`🏓 *Pong!*\nBot Latency: **${Math.round(this.container.client.ws.ping)}**ms`)
      }
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}