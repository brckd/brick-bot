import { MessageReaction, User } from "discord.js";
import { EventTemplate } from "handlers";

export default {
    run: async (client, inter: MessageReaction, user: User) => {
        if (inter.message.author?.id === client.user?.id && inter.emoji.name === '❌') {
            if (inter.message.guild
                && (inter.message.interaction?.user === user // interaction commands
                    || ( // legacy commands
                        inter.message.reference?.messageId
                        && await (
                            await inter.message.channel.messages.fetch(inter.message.reference.messageId)
                        ).author === user
                    )
                )
            ) inter.message.delete()
        }
    }
} as EventTemplate