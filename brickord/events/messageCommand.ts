import { EventData, CommandNotFound, commandOptions, CommandError, TooManyArguments, AttachmentNotFound, getBoolean, getMember, getChannel, getRole, getMentionable, getInt, getNumber } from '..'

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
            if (!command) throw new CommandNotFound(name)

            if (!command.data.options)
                command.data.options = []
                
            if (options.length > command.data.options.length)
                throw new TooManyArguments(command.data.options.length, options.length)
                
            const args = await Promise.all(command.data.options.map(async (option, i) => {
                const query: string = options[i]
                if (!query && !option.required) return
                const arg = await (
                    async () => {switch (option.type) {
                        case 3: return query
                        case 4: return getInt(query)
                        case 5: return getBoolean(query)
                        case 6: return await getMember(message, query)
                        case 7: return getChannel(message, query)
                        case 8: return getRole(message, query)
                        case 9: return getMentionable(message, query)
                        case 10: return getNumber(query)
                        case 11: 
                            const result = attachments.shift()
                            if (!result) throw new AttachmentNotFound()
                            return result
                    }
                })()
                if (arg === undefined || arg === null) {
                    throw new CommandError(`Couldn't convert \`${query}\` to ${commandOptions[option.type-1]}`)
                }
                return arg
            }))

            command.run(message, ...args)
        }
        catch (err) {
            if(err instanceof CommandError)
                client.emit('commandError', message, err)
            else
                console.error(err)
        }
    }
} as EventData<'messageCreate'>
