import { MessageReaction, User } from "discord.js";
import { EventTemplate } from "handlers";

export default {
    run: async (client, inter: MessageReaction, user: User) => {
        if (inter.message.author === client.user && inter.emoji.name === '❌') {
            if (inter.message.guild
                && inter.message.reference?.messageId
                && await (
                    await inter.message.channel.messages.fetch(inter.message.reference.messageId)
                ).author === user
            ) inter.message.delete()
        }
    }
} as EventTemplate