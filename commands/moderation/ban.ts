import { GuildMember } from "discord.js";
import { CommandTemplate } from "handlers";

const durations = [
    {name: 'Don\' Delete Any', value: 0},
    {name: 'Previous 24 Hours', value: 1000 * 60 * 60 * 24},
    {name: 'Previous 7 Days', value: 1000 * 60 * 60 * 24 * 7}
]

export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Ban user',
    permissions: ['BAN_MEMBERS'],
    guildOnly: true,

    options: [
        {
            name: 'user',
            description: 'The user to ban',
            type: 'USER',
            required: true
        },
        {
            name: 'delete_messages',
            description: 'How much of their recent message history to delete',
            type: 'NUMBER',
            choices: durations,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for banning, if any',
            type: 'STRING',
            required: false
        }
    ],

    run: ({ cmdInter }, member: GuildMember, delete_messages: Number, reason?: string) => {
        if (!member) 
            return cmdInter!.reply('Invalid user')

        const user = member.user

        cmdInter!.guild?.bans.create(
            member,
            {days: 7, reason: reason}
        )

        cmdInter!.reply(`${user.tag} has been banned ${reason?'for reason:\n> '+reason:''}
        ${delete_messages>0 ? durations.find(d=>delete_messages===d.value)?.name + ' of message history have been deleted' : ''}`)
    }
} as CommandTemplate