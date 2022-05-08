import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { CommandTemplate } from "handlers";

export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Sends buttons to select roles from',
    guildOnly: true,

    run: ({ cmdInter, channel }) => {
        channel!.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Select Role')
                    .setDescription('Select roles from the buttons below')
            ],
            components: [
                new MessageActionRow()
                    .addComponents([
                        new MessageButton()
                            .setCustomId('role-970334995099041822')
                            .setStyle('PRIMARY')
                            .setLabel('Fanbot'),
                        new MessageButton()
                            .setCustomId('role-970334887607427172')
                            .setStyle('PRIMARY')
                            .setLabel('Fandev'),
                        new MessageButton()
                            .setCustomId('role-970277084729598032')
                            .setStyle('PRIMARY')
                            .setLabel('Fanmod')
                    ])
            ]
        })

        cmdInter?.reply({
            content: 'Buttons have been send',
            ephemeral: true
        })
    }
} as CommandTemplate