import { EventData, mainRoot } from '../brickord'
import { TextChannel, MessageEmbedOptions, Message } from 'discord.js'
import { replace } from '../utils'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(mainRoot, '.env')})

export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot) return
        if (!(message.channel instanceof TextChannel)) return
        if (!message.deletable) return

        let content = message.content

        // incomplete links
        content = replace(content, /(?:^| )[a-z.]+\.[a-z]+[a-zA-Z0-9/-_&=\?]*(?: |$)/gm, s => `[${s}](https://${s})`)

        // global replies
        let reply: Message | undefined

        const msgUrlRegExp = /https:\/\/discord\.com\/channels\/\d{17,19}\/\d{17,19}\/(\d{17,19})/
        let replyUrl = content.match(msgUrlRegExp)

        if (replyUrl) {
            const ids = replyUrl[0].split('/')
            const channel = client.channels.cache.get(ids[5])

            if (channel?.isText()) {
                reply = await channel.messages.fetch(ids[6])
                if (reply)
                    content = content.replace(msgUrlRegExp, '')
            }
        }

        // check
        if (content === message.content) return

        // local replies
        if (message.reference?.messageId){
            reply = message.channel.messages.cache.get(message.reference.messageId) ?? reply
        }

        // reply embed
        let embeds = message.embeds as MessageEmbedOptions[]
        if (reply) {
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