import { MessageReaction, User } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Collections',
    description: 'Collects a reaction',
    
    callback: async ({ message }) => {
        const sent = await message.reply('Please confirm this action')
        const reacted = await sent.react('✅')

        const collector = sent.createReactionCollector({
            filter: (r, u) => r.emoji.name === '✅' && u.id === message.author.id,
            max: 1,
            time: 1000 * 5
        })

        // collector.on('collect', (r) => {
        //     console.log(r.emoji)
        // })

        collector.on('end', (collected) => {
            if (collected.size === 0) {
                sent.reply('You did not react in time')
                reacted.remove()
                return
            }

            const text = 'Collected:\n>>> ' + collected.map(m => m.emoji.toString()).join('\n')
            message.reply(text)
        })
    }
} as ICommand