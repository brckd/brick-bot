import Discord from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { SlashCommandData } from '../brickord'

export const echo = {
    data: new SlashCommandBuilder()
        .setDescription('Sends the passed text')
        .addStringOption( option => option
            .setName('text')
            .setDescription('The text to send')
            .setRequired(true)
        ),
    run: (interaction, text: string) => {
        interaction.channel?.send(text)

        if (interaction instanceof Discord.CommandInteraction)
            interaction.reply({
                content: 'Message has been send',
                ephemeral: true
            })
    }
} as SlashCommandData

export const mention = {
    data: new SlashCommandBuilder()
        .setDescription('Mentions a user or role')
        .addMentionableOption( option => option
            .setName('mentionable')
            .setDescription('The user or role to mention')
            .setRequired(true)
        ),
    run: (interaction, mention: Discord.User) => {
        interaction.reply(mention.toString())
    }
} as SlashCommandData

export const channel = {
    data: new SlashCommandBuilder()
        .setDescription('Tags a channel')
        .addChannelOption( option => option
            .setName('channel')
            .setDescription('The channel to tag')
            .setRequired(true)
        ),
    run: (interaction, channel: Discord.Channel) => {
        interaction.reply(channel.toString())
    }
} as SlashCommandData