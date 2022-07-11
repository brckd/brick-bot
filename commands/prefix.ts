import { SlashCommandBuilder, inlineCode } from '@discordjs/builders'
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
        
        prefix = ((await Prefix.where('id').equals(interaction.guildId).select('prefix'))[0] || {prefix: interaction.client.prefix.join(', ')}).prefix!
        interaction.reply(`The current prefix is ${inlineCode(prefix)}`)
    }
} as ChatCommandData