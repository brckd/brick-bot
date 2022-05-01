import { Message } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Collections',
    description: 'Collects your username',
    
    callback: ({ message, channel }) => {
        message.reply('Enter your username')

        const collector = channel.createMessageCollector({
            filter: (m) => m.author.id === message.author.id,
            max: 1,
            time: 1000 * 5
        })

        // collector.on('collect', (m) => {
        //     console.log(m.content)
        // })

        collector.on('end', (collected) => {
            if (collected.size === 0) {
                message.reply('You did not provide your username')
                return
            }

            const text = 'Collected:\n>>> ' + collected.map(m => m.content).join('\n')
            message.reply(text)
        })
    }
} as ICommand