import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatCommandData } from '../brickord'
import { emojify } from '../events/emojify'

export default {
    data: new SlashCommandBuilder()
        .setDescription('Replaces the text with emojis')
        .addStringOption(o => o
            .setName('text')
            .setDescription('The text to replace')
            .setRequired(true)
        ),
    run: (interaction, text: string) => {
        interaction.reply(
            emojify(text) + '_ _'
        )
    }
} as ChatCommandData