import Discord, { Client, GuildMember, MessageActionRow, MessageSelectMenu, MessageSelectOption, MessageSelectOptionData, Role } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Adds or removes an auto role from the message above',
    slash: 'both',
    testOnly: true,
    guildOnly: true,

    minArgs: 1,
    expectedArgs: '<role>',
    expectedArgsTypes: ['ROLE'],

    permissions: ['MANAGE_ROLES'],

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) return
            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                
                for (const option of component.options) {
                    if (values.includes(option.value))
                        member.roles.add(option.value)
                    else
                        member.roles.remove(option.value)
                }

                interaction.reply({
                    content: 'Roles updated',
                    ephemeral: true
                })
            }
        })
    },

    callback: ({ client, message, interaction, channel, user }) => {
        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role')) as Role
        if (!role) {
            return 'Not a role'
        }

        const target = channel.messages.cache.reverse().find(m=> m !== message && [user, client.user].includes(m.author))
        if (!target)
            return 'No message found in this channel'
        
        const option = {
            label: role.name,
            value: role.id,
            emoji: {name: '👥'}
        } as MessageSelectOption

        const components = target.components || [] // components
        let c = components.findIndex(c => c.components.some(c => c.type === "SELECT_MENU" && c.customId==='auto_roles')) // component

        if (c===-1) {
            components.push(new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setPlaceholder('Select your roles')
                    .setMinValues(0)
            ))
            c = components.length-1
        }
        
        let m = components[c].components.findIndex(c => c.type === "SELECT_MENU" && c.customId==='auto_roles')! // menu
        let o = (components[c].components[m] as MessageSelectMenu).options.findIndex(o => o.value===option.value) // option

        if (o===-1) //add
            (components[c].components[m] as MessageSelectMenu).addOptions(option as MessageSelectOptionData)
        else // remove
            (components[c].components[m] as MessageSelectMenu).spliceOptions(o, 1)
            if ((components[c].components[m] as MessageSelectMenu).options.length === 0) {
                components[c].components.splice(m, 1)
                if (components[c].components.length === 0)
                    components.splice(c, 1)
            } else
                (components[c].components[m] as MessageSelectMenu).maxValues = (components[c].components[m] as MessageSelectMenu).options.length
        
        if (target.author === client.user) {
            target.edit({
                content: target.content,
                components
            })
        } else {
            channel.send({
                content: target.content,
                components,
                allowedMentions: {users:[]}
            })
            target.delete()
        }

        if (o===-1)
            return {
                custom: true,
                content: `Role ${role} added`,
                ephemeral: true
            }
        else
            return {
                custom: true,
                content: `Role ${role} removed`,
                ephemeral: true
            }
    }
} as ICommand