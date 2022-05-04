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
    description: 'Time out user',
    permissions: ['MODERATE_MEMBERS'],
    guildOnly: true,
    slash: 'both',
    
    options: [
        {
            name: 'user',
            description: 'The user to timeout',
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'How long they should be timed out',
            type: 'NUMBER',
            choices: durations,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for timing them out, if any',
            type: 'STRING',
            required: false
        }
    ],

    run: ({ interaction }, member: GuildMember, duration: number, reason?: string) => {
        member.timeout(duration, reason)
        interaction!.reply(`${member.user.tag} has been timed out for ${durations.find(d=>duration===d.value)?.name}${reason?'for reason:\n> '+reason:''}`)
    }
} as CommandTemplate