import { GuildMember } from "discord.js";
import { CommandTemplate } from "../../handlers";

const durations = [
    {name: '60 seconds', value: 1000 * 60},
    {name: '5 Minutes', value: 1000 * 60 * 5},
    {name: '10 Minutes', value: 1000 * 60 * 10},
    {name: '30 Minutes', value: 1000 * 60 * 30},
    {name: '1 Hour', value: 1000 * 60 * 60},
    {name: '1 Week', value: 1000 * 60 * 60 * 24 * 7},
]

export default {
    description: 'Kick user',
    permissions: ['KICK_MEMBERS'],
    guildOnly: true,
    slash: true,

    options: [
        {
            name: 'user',
            description: 'The user to kick',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for kicking, if any',
            type: 'STRING',
            required: false
        }
    ],

    run: ({ interaction }, member: GuildMember, reason?: string) => {
        member.kick(reason)
        interaction!.reply(`${member.user.tag} has been kicked ${reason?'for reason:\n> '+reason:''}`)
    }
} as CommandTemplate