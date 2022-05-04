import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { CommandTemplate } from "../../handlers";

export default {
    devOnly: true,

    run: ({ client, message }) => {
        message.channel.send({
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
    }
} as CommandTemplate