import { EventData } from '../brickord'

export default {
    name: 'messageReactionAdd',
    run: async (client, reaction, user) => {
        if (reaction.emoji.name !== '❌') return
        if (user.bot) return

        let message = reaction.message
        if (reaction.message.partial)
            message = await reaction.message.fetch()
            
        if (!message.deletable) return
        if (message.author?.id !== client.user?.id) return

        let del = false
        
        if (
            message.reference?.messageId
            && message.channel.messages.cache.get(message.reference?.messageId)?.author.id == user.id
        ) del = true
        if (
            message.interaction?.user.id == user.id
        ) del = true

        if (!del) return

        message.delete()
    }
} as EventData<'messageReactionAdd'>