import { Message, MessageEmbedOptions, MessageOptions, Permissions, ReplyMessageOptions } from "discord.js"
import { EventTemplate, isCommandEmbedOptions } from ".."

export default {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        if (message.author.bot) return
        
        let prefix = client.prefix.find((prefix) =>
            typeof(prefix) === 'string'
            ? message.content.includes(prefix)
            : message.content.search(prefix)
        )
        
        if (!prefix) return

        const args = message.content.replace(prefix, '').trim().split(/ +/g)
        const name = args.shift()?.toLowerCase()!
        
        let command = client.commands.get(name)
        if (!command) return
        if (!command.types?.includes('LEGACY')) return

        if (command.devOnly && !client.owners.includes(message.author.id))
            return message.reply('This command is only available to the bot owners')
        
        if (command.guildOnly && !message.guild)
            return message.reply('This command can only be run in a guild')

        if (command.permissions) {
            let missing = message.member ? message.member.permissions.missing(command.permissions) : new Permissions(command.permissions).toArray()
            if(missing.length>0)
                return message.reply(`Missing permissions to run this command:\n>>> ${missing.join('\n')}`)
        }

        try {
            const reply = async (options: any) => {
                if (isCommandEmbedOptions(options)) {
                    options = {
                        embeds: [{
                            author: {
                                name: command?.name.replace(/\b[a-z]/g, c=>c.toUpperCase()),
                                icon_url: client.user?.avatarURL(),
                            },
                            color: client.color,
                            ...options
                        } as MessageEmbedOptions],
                        ...options
                    } as MessageOptions
                }
                
                if (hasOwnProperty(options, 'ephemeral') && options.ephemeral===true) {
                    let sent
                    try {
                        sent = await message.author.send(options)
                        message.delete()
                    }
                    catch {
                        options.content += '\n`Please enable DM messages to receive permanent replies`'
                        sent = message.reply(options)
                        sent.then(repliedMessage => {
                            setTimeout(() => {
                                repliedMessage.delete()
                                message.delete()
                            }, 1000 * 5);
                        })
                    }
                    return sent
                } else {
                    return message.reply(options)
                }
            }
            command.run({
                client,
                message,
                member: message.member,
                user: message.author,
                channel: message.channel,
                channelId: message.channelId,
                guild: message.guild,
                guildId: message.guildId,
                reply: reply,
                fetchedReply: reply
            }, ...args)
        }
        catch (err) {
            if (err instanceof Error && err.toString().startsWith('?'))
                message.reply(err.toString())
            else 
                console.error(err)
        }
    }
} as EventTemplate

function hasOwnProperty<T, K extends PropertyKey>(
    obj: T,
    prop: K
): obj is T & Record<K, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}