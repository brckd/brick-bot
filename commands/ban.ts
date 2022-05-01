import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user',
    permissions: ['BAN_MEMBERS'],

    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {
        const target = message ? message.mentions.members?.first() : interaction.options.getMember('user') as GuildMember

        if (!target)
            return {
                custom: true,
                content: 'Please tag someone to ban',
                ephemeral: true
            }

        if (!target.bannable)
            return {
                custom: true,
                content: 'Cannot ban that user',
                ephemeral: true
            }
        
        args.shift()
        const reason = args.join(' ')

        target.ban({reason})

        return {
            custom: true,
            content: `${target} was banned for reason:\n> ${reason}`,
            ephemeral: true
        }
    }
} as ICommand