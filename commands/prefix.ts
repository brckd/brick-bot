import { SlashCommandBuilder, bold } from '@discordjs/builders'
import { ChatCommandData } from 'brickord.js'
import Prefix from '../schemas/prefix'

export default {
    data: new SlashCommandBuilder()
        .setDescription('Shows or sets the prefix of this guild')
        .addStringOption(o => o
            .setName('prefix')
            .setDescription('The new prefix')
        ),
    run: async (interaction, prefix?: string) => {
        if (prefix)
            await Prefix.findOneAndUpdate({ id: interaction.guildId }, { prefix }, { upsert: true, new: true })
        
        const prefixes = (await (interaction.client.prefix.resolve(interaction))).map(p => bold(p.toString())).join(', ')
        if (prefix)
            interaction.reply(`The new prefixes are ${prefixes}`)
        else
            interaction.reply(`The current prefixes are ${prefixes}`)
    }
} as ChatCommandData