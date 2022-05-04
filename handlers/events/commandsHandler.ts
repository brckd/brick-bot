import { Message, Permissions } from "discord.js"
import { EventTemplate } from ".."

export default {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        if (message.author.bot) return
        
        if (message.content.search(client.prefix) === -1) return

        const args = message.content.replace(client.prefix, '').trim().split(/ +/g)
        const name = args.shift()?.toLowerCase()!
        
        let command = client.commands.get(name)
        if (!command) return
        if (command.slash===true) return

        if (command.devOnly && !client.owners.includes(message.author.id))
            return message.reply('This command is only available to the bot owners')
        
        
        if (command.permissions) {
            let missing = message.member ? message.member.permissions.missing(command.permissions) : new Permissions(command.permissions).toArray()
            if(missing.length>0)
                return message.reply(`Missing permissions to run this command:\n>>> ${missing.join('\n')}`)
        }

        try {
            command.run({
                client,
                message,
                member: message.member,
                user: message.author,
                channel: message.channel,
                channelId: message.channelId,
                guild: message.guild,
                guildId: message.guildId,
                reply: async (options) => {
                    if (hasOwnProperty(options, 'ephemeral') && hasOwnProperty(options, 'content') && options.ephemeral===true) {
                        let sent
                        try {
                            sent = await message.author.send(options)
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