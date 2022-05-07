import { Message } from "discord.js";
import { CommandTemplate } from "../../handlers";

export default {
    types: ['MESSAGE'],
    
    run: async ({ client, msgInter }) => {
        if (
            msgInter!.targetMessage.author === client.user
            && msgInter!.targetMessage instanceof Message
            && msgInter!.targetMessage.reference?.messageId
            && await (
                await msgInter!.targetMessage.channel.messages.fetch(msgInter!.targetMessage.reference.messageId)
            ).author === msgInter?.user
        ) {
            msgInter.targetMessage.delete()
            msgInter!.reply({
                content: 'Message has been deleted',
                ephemeral: true
            })
        } else {
            msgInter!.reply({
                content: 'You cannot delete this Message',
                ephemeral: true
            })
        }
            
    }
} as CommandTemplate