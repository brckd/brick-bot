import { CommandTemplate } from "handlers"
import { GuildMember, TextChannel } from 'discord.js'

export default {
    types: ['SLASH'],
    description: 'Impersonate someone',
    guildOnly: true,

    options: [{
            name: 'text',
            type: 'STRING',
            description: 'The text to send',
            required: true
        }, {
            name: 'user',
            type: 'USER',
            description: 'The user to impersonate'
        }
    ],

    run: async ({ channel, client, member, cmdInter }, text: string, user?: GuildMember) => {
        user = user ?? member!
        const webhook = await (channel as TextChannel).createWebhook(client.user?.username!)
        webhook.send({
            content: text,
            avatarURL: user.displayAvatarURL()!,
            username: user.displayName
        })
        cmdInter!.reply({
            content: 'Tupper has been sent',
            ephemeral: true
        })
    }
} as CommandTemplate