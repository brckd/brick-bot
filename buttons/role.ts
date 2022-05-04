import { GuildMember } from "discord.js";
import { ButtonTemplate } from "../handlers";

export default {
    name: 'role',
    guildOnly: true,

    run: ({ client, interaction }, roleId) => {
        if (!(interaction.member instanceof GuildMember)) return

        if (interaction.member.roles.cache.has(roleId))
            interaction.member?.roles.remove(roleId)
        else
            interaction.member?.roles.add(roleId)

        interaction.deferUpdate()
    }
} as ButtonTemplate