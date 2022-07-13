import { EventData, mainRoot } from 'brickord.js'
import { MessageEmbedOptions, Message } from 'discord.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(mainRoot, '.env')})

export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot) return
        if (!("fetchWebhooks" in message.channel)) return
        if (!message.deletable) return

        let content = message.content

        // incomplete links

        const domainChars = 'a-zA-Z0-9@%._\\\\+~#?&='
        const urlChars = domainChars + ':/'
        const url = `[${domainChars}]{2,256}\\.[${domainChars}]{2,6}/?[${urlChars}]*`
        const hyperLink = ['\\[.*\\]\\(', '\\)']
        content = content.replace(new RegExp(`(?<![${urlChars}]|${hyperLink[0]})${url}`, 'g'), s => `[${s}](https://${s})`) // create hyperlinks
        content = content.replace(new RegExp(`(?<=${hyperLink[0]})${url}(?=${hyperLink[1]})`, 'g'), s => `https://${s}`) // replace existing hyperlinks

        // global replies
        let replies: Message[] = []
        let reply: Message | undefined

        const msgUrlRegExp = / ?https:\/\/discord\.com\/channels\/\d{17,19}\/\d{17,19}\/(\d{17,19})/g
        let replyUrls = content.match(msgUrlRegExp) ?? []

        for (const url of replyUrls) {
            const ids = url.split('/')
            const channel = client.channels.cache.get(ids[5])

            if (channel?.isText()) {
                reply = await channel.messages.fetch(ids[6])
                if (reply)
                    replies.push(reply)
            }
        }
        content = content.replace(msgUrlRegExp, '')

        // checks
        let replace = false
        if (content !== message.content) replace = true
        if (new RegExp(`${hyperLink[0]}https?://${url}${hyperLink[1]}`).test(content)) replace = true // hyperlinks
        
        if (!replace) return

        // local replies
        if (message.reference?.messageId){
            reply = message.channel.messages.cache.get(message.reference.messageId)
            if (reply) replies.push(reply)
        }

        // reply embed
        let embeds = message.embeds as MessageEmbedOptions[]
        for (reply of replies) {
            embeds.push({
                description: reply.content,
                author: {
                    name: reply.author.username,
                    iconURL: reply.author.avatarURL() ?? undefined,
                    url: reply.url
                },
                color: "DARKER_GREY",
                image: {
                    url: reply.attachments.first()?.url,
                }
            })
        }

        const webhook =
            (await message.channel?.fetchWebhooks())?.find(w => w.name === process.env.WEBHOOK_NAME)
            ?? (await message.channel.createWebhook(process.env.WEBHOOK_NAME!))
        
        webhook.send({
            username: message.author.username,
            avatarURL: message.author.avatarURL()!,
            content: content || '_ _',
            attachments: message.attachments.toJSON(),
            embeds: message.embeds
        })
        message.delete()
    }
} as EventData<'messageCreate'>