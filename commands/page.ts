import { Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

const embeds = Array.from(
    {length: 5},
    (_, i) => new MessageEmbed().setDescription(`Page ${i+1}`)
) as MessageEmbed[]

let pages: {[id: string]: number} = {}

const getRow = (id: string) => {
    return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('prev')
                .setStyle('PRIMARY')
                .setEmoji('◀️')
                .setDisabled(pages[id] === 0)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('next')
                .setStyle('PRIMARY')
                .setEmoji('▶️')
                .setDisabled(pages[id] === embeds.length-1)
        )
}

export default {
    category: 'Testing',
    description: 'Sends an embed pagination',
    slash: 'both',
    testOnly: true,

    callback: async ({ user, message, interaction, channel }) => {
        const id = user.id
        pages[id] = pages[id] || 0

        let reply: Message | undefined
        let collector

        const filter = (i: Interaction) => i.user.id === user.id
        const time = 1000 * 60 * 5

        if (message) {
            reply = await message.reply({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)]
            })
            collector = reply.createMessageComponentCollector({ filter, time }) 
        }
        else {
            await interaction.reply({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)],
                ephemeral: true
            })
            collector = channel.createMessageComponentCollector({ filter, time }) 
        }

        collector.on('collect', (i) => {
            if (!i) return

            i.deferUpdate()

            if (!['prev', 'next'].includes(i.customId)) return

            if(i.customId === 'prev' && pages[id] > 0)
                --pages[id]
            if(i.customId === 'next' && pages[id] < embeds.length -1)
                ++pages[id]

            if (reply)
                reply.edit({
                    embeds: [embeds[pages[id]]],
                    components: [getRow(id)]
                })
            else
                interaction.editReply({
                    embeds: [embeds[pages[id]]],
                    components: [getRow(id)]
                })
        })
    }
} as ICommand