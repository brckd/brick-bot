import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatCommandData } from '../brickord'

export default {
    data: new SlashCommandBuilder()
        .setDescription('Repeats your input')
        .addStringOption(o => o
            .setName('text')
            .setDescription('The text to repeat')
            .setRequired(true)
        ),
    run: (interaction, text: string) => {
        interaction.reply(text)
    }
} as ChatCommandData