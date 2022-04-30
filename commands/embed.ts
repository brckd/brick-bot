import { DiscordAPIError, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'testing',
    description: 'Sends an embed',
    permissions: ['ADMINISTRATOR'],
    testOnly: true,

    callback: async ({ message }) => {
        const embed =  new MessageEmbed({
            title: 'Title',
            description: 'Description',
            color: 'BLURPLE',
            footer: {text: 'Footer'},
            fields: [
                {
                    name: 'Field 1',
                    value: 'Description 1',
                    inline: true
                },
                
                {
                    name: 'Field 2',
                    value: 'Description 2',
                    inline: true
                }
            ]
        })

        const sent = await (message).reply({
            embeds: [embed]
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        sent.edit({
            embeds: [embed.setTitle('New Title')]
        })
    }
} as ICommand