import { GuildMember } from "discord.js"
import { CommandTemplate } from "handlers"

export default {
    name: 'user info',
    types: ['USER'],
    guildOnly: true,
    
    run: ({ usrInter, reply, user }) => {
        if (!(usrInter?.targetMember instanceof GuildMember)) return
        reply({
            description: `${usrInter.targetMember.toString()}\n[Avatar](${usrInter.targetMember.displayAvatarURL()})`,
            thumbnail: {
                url: usrInter.targetMember.displayAvatarURL()
            },
            fields: [{
                    name: 'Joined',
                    value: `<t:${Math.round(usrInter.targetMember.joinedTimestamp!/1000)}:R>`,
                    inline: true
                }, {
                    name: 'Registered',
                    value: `<t:${Math.round(user.createdTimestamp/1000)}:R>`,
                    inline: true
                }, {
                    name: `Roles (${usrInter.targetMember.roles.cache.size})`,
                    value: usrInter.targetMember.roles.cache.reverse().map(r => r.toString()).join(' ')!,
                    inline: false
                }
            ]
        })
    }
} as CommandTemplate