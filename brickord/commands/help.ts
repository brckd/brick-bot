import { ChatCommandData, CommandNotFound } from '..'
import { SlashCommandBuilder } from '@discordjs/builders'

export default {
    data: new SlashCommandBuilder()
        .setDescription('Sends info about commands')
        .addStringOption(o => o
            .setName('command')
            .setDescription('The command to get info about')

        ),
    run: (interaction, command?: string) => {
        if (!command)
            interaction.reply({
                embeds: [{
                    title: 'Help',
                    description: 'Use `help [command]` for more info on a command.',
                    fields: [{
                        name: 'Commands',
                        value: interaction.client.commands.map(c => `${c.data.name} ${(c.data.options?.map(o => o.required ? `<${o.name}>` : `[${o.name}]`).join(' ') ?? '')}`).join('\n')
                    }]
                }]
            })
        else {
            const cmd = interaction.client.commands.get(command)
            if (!cmd) throw new CommandNotFound(command)

            interaction.reply({
                embeds: [{
                    title: 'Help',
                    description: `${cmd.data.name} ${(cmd.data.options?.map(o => o.required ? `<${o.name}>` : `[${o.name}]`).join(' ') ?? '')}`,
                }]
            })
        }
    }
} as ChatCommandData
