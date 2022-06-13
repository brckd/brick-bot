import Discord from 'discord.js'
import { EventData } from '..'

const optionTypes = [undefined, 'subcommand', 'subcommand group', 'string', 'integer', 'boolean', 'member', 'channel', 'role', 'mentionable', 'number', 'attachment']

export default {
    name: 'messageCreate',
    run: async (client, message) => {
        if (message.author.bot) return
        
        let prefix = client.prefix.find((prefix) =>
            typeof(prefix) === 'string'
            ? message.content.startsWith(prefix)
            : message.content.search(prefix)
        )
        
        if (!prefix) return
        
        const options = message.content.replace(prefix, '').trim().split(/ +/g)
        const name = options.shift()?.toLowerCase()!
        
        let command = client.commands.get(name)

        const attachments = message.attachments.toJSON()
        
        try {
            if (!command) throw new Error(`Command not found: ${name}`)

            if (!command.data.options) return command.run(message)

            const args = await Promise.all(command.data.options.map(async (option, i) => {
                const query: string = options[i]
                const arg = await (
                    async () => {switch (option.type) {
                        case 3: return query
                        case 4: return parseInt(query)
                        case 5: return getBoolean(query)
                        case 6: return await getMember(message, query)
                        case 7: return getChannel(message, query)
                        case 8: return getRole(message, query)
                        case 9: return getRole(message, query) ?? await getMember(message, query)
                        case 10: return parseFloat(query)
                        case 11: return attachments.shift()
                    }
                })()
                if (arg === undefined || arg === null) {
                    throw new Error(`Couldn't convert \`${query}\` to ${optionTypes[option.type]}`)
                }
                return arg
            }))

            command.run(message, ...args)
        }
        catch (err) {
            if(err instanceof Error)
                client.emit('commandError', message, err)
            else
                console.error(err)
        }
    }
} as EventData<'messageCreate'>

export function getBoolean(query: string) {
    return ['true', 'yes'].includes(query.toLowerCase())
        ? true
        : ['false', 'no'].includes(query.toLowerCase())
        ? false
        : undefined
}
export async function getMember(message: Discord.Message, query: string) {
    return message.guild?.members.cache.get(query.replace( /\D+/g, ''))
        ?? (await message.guild?.members.search({ query: query, limit: 1 }))?.first()
}
export function getChannel(message: Discord.Message, query: string) {
    return message.guild?.channels.cache.get(query.replace( /\D+/g, ''))
        ?? message.guild?.channels.cache.find(c => c.name === query.replace( /[^A-Za-z0-9-]+/g, '').toLowerCase())
}
export function getRole(message: Discord.Message, query: string) {
    return message.guild?.roles.cache.get(query.replace( /\D+/g, ''))
        ?? message.guild?.roles.cache.find(r => r.name.toLowerCase() === query.replace( /[^A-Za-z0-9]+/g, '').toLowerCase())
}