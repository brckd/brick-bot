import { ButtonInteraction, Interaction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Sends some buttons',
    slash: true,
    testOnly: true,

    callback: async ({interaction: inter, channel}) => {
        const components = [
            new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Confirm')
                        .setCustomId('ban_yes')
                        .setLabel('🔨')
                        .setStyle('SUCCESS')
                )
                .addComponents(
                    new MessageButton()
                        .setLabel('Cancel')
                        .setCustomId('ban_no')
                        .setStyle('DANGER')
                ),

            new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Visit Discord.JS')
                        .setURL('https://discord.js.org/')
                        .setStyle('LINK')
                )
        ]

        inter.reply({
            content: 'Are you sure?',
            components,
            ephemeral: true
        })

        const filter = (i: Interaction) => {
            return i.user.id === inter.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        collector.on('collect', (i: ButtonInteraction) => {
            i.reply({
                content: 'You clicked a button',
                ephemeral: true
            })
        })

        collector.on('end', async (collection) => {
            collection.forEach((click) => {
                console.log(click.user.id, click.customId)
            })

            switch (collection.first()?.customId) {
                case 'ban_yes':
                    // ban the target user
                    break
            }
            await inter.editReply({
                content: 'An action has already been taken.',
                components: []
            })
        })
    }
} as ICommand