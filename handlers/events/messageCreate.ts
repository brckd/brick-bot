import { Message, Permissions } from "discord.js"
import { EventTemplate } from ".."

export default {
    run: async (client, message: Message) => {
        if (message.author.bot) return
        if (!message.content.startsWith(client.prefix)) return

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g)
        const name = args.shift()?.toLowerCase()!
        
        let command = client.commands.get(name)
        if (!command) return

        if (command.devOnly && !client.owners.includes(message.author.id))
            return message.reply('This command is only available to the bot owners')
        
        
        if (command.permissions) {
            let missing = message.member ? message.member.permissions.missing(command.permissions) : new Permissions(command.permissions).toArray()
            if(missing.length>0)
                return message.reply(`Missing permissions to run this command:\n>>> ${missing.join('\n')}`)
        }

        try {
            command.run({client, message}, ...args)
        }
        catch (err) {
            if (err instanceof Error && err.toString().startsWith('?'))
                message.reply(err.toString())
            else 
                console.error(err)
        }
    }
} as EventTemplate