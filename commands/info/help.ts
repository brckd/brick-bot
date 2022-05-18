import { Client, CommandTemplate } from "handlers"
import Discord from 'discord.js'


export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Sends info about commands',

    options: [{
        name: 'command',
        description: 'The command to get help for',
        type: 'STRING',

        autocomplete: true
    }],
    
    init: (client, command) => {
        client.on('interactionCreate', (interaction) => {
            if (!interaction.isAutocomplete()) return
            if (interaction.commandName !== command.name) return
            interaction.respond(
                [...client.commands.keys()].filter(
                    s => s.toLowerCase().includes((interaction.options.getFocused() as string).toLowerCase())
                ).map(
                    name => ({name: name, value: name})
                )
            )
        })
    },

    run: ({ client, reply }, command: string) => {
        const cmd = client.commands.get(command)
        reply({
            description: cmd?.description ?? 'Use `help [command]` for more info on a command.\nYou can also use `help [Category]` for more info on a category.',
            fields: cmd ? [] : client.categories.map(ca => ({
                    name: ca.at(0)!.category,
                    value: ca.map(c=>c.name).join('  ')
                })
            )
        })
    }
} as CommandTemplate