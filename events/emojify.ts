import { EventData, mainRoot } from 'brickord.js'
import { TextChannel } from 'discord.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(mainRoot, '.env')})

export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.channel.id !== '993116409053855765') return
        if (message.author.bot) return
        if (!(message.channel instanceof TextChannel)) return
        if (!message.deletable) return

        const webhook =
            (await message.channel?.fetchWebhooks())?.find(w => w.name === process.env.WEBHOOK_NAME)
            ?? (await message.channel.createWebhook(process.env.WEBHOOK_NAME!))

        webhook.send({
            username: message.author.username,
            avatarURL: message.author.avatarURL()!,
            content: emojify(message.content) + '_ _'
        })
        message.delete()

        message.cleanContent
    }
} as EventData<'messageCreate'>

export function emojify(text: string) {
    return text
        .toLowerCase()
        .split('').join(' ')
        .replace('  ', '   ')
        .replace(/< (-|=) >/g, '↔️')
        .replace(/(-|=) >/g, '➡️')
        .replace(/< (-|=)/g, '⬅️')
        .replace('.', '▫️')
        .replace('?', '❔')
        .replace('!', '❕')
        .replace('+', '➕')
        .replace('-', '➖')
        .replace('×', '✖')
        .replace('÷', '➗')
        .replace('>', '▶')
        .replace('<', '◀')
        .replace('*', '*️⃣')
        .replace('^', '🔺')
        .replace('#', '#️⃣')
        .replace('$', '💵')
        .replace('¥', '💴')
        .replace('€', '💶')
        .replace('£', '💷')
        .replace('1 0', '🔟')
        .replace('0', '0️⃣')
        .replace('1', '1️⃣')
        .replace('2', '2️⃣')
        .replace('3', '3️⃣')
        .replace('4', '4️⃣')
        .replace('5', '5️⃣')
        .replace('6', '6️⃣')
        .replace('7', '7️⃣')
        .replace('8', '8️⃣')
        .replace('9', '9️⃣')
        .replace('a b', '🆎')
        .replace('c l', '🆑')
        .replace('c o o l', '🆒')
        .replace('f r e e', '🆓')
        .replace('i d', '🆔')
        .replace('n e w', '🆕')
        .replace('n g', '🆖')
        .replace('o k', '🆗')
        .replace('s o s', '🆘')
        .replace('u p !', '🆙')
        .replace('v s', '🆚')
        .replace(/[a-z]/ig, c => `:regional_indicator_${c}:`)
}