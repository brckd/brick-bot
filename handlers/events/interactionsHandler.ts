import { ButtonInteraction, CommandInteraction, GuildMember, Interaction, MessageContextMenuInteraction, Permissions, UserContextMenuInteraction } from "discord.js";
import { EventTemplate, Client } from "..";

export default {
    name: 'interactionCreate',
    run: (client, interaction: Interaction) => {
        if (
            interaction.isCommand()
            || interaction.isMessageContextMenu()
            || interaction.isUserContextMenu()
        ) return handleApplicationCommand(client, interaction)
    
        if (
            interaction.isButton()
        ) return handleButton(client, interaction)
    }
} as EventTemplate

const handleApplicationCommand = (client: Client, interaction: CommandInteraction | MessageContextMenuInteraction | UserContextMenuInteraction) => {
    const command = client.commands.get(interaction.commandName)

    if (!command) return interaction.reply('Command not found')
    if (!(interaction.member instanceof GuildMember)) return

    let missing = interaction.member ? interaction.memberPermissions?.missing(command.permissions??[])! : new Permissions(command.permissions??[]).toArray()
    if (missing.length > 0)
    return interaction.reply({
        content: `Missing permissions to run this command:\n>>> ${missing.join('\n')}`,
        ephemeral: true
    })

    if (command.guildOnly && !interaction.guild)
        return interaction.reply({
            content: 'Command can only be run in a guild',
            ephemeral: true
    })

    let args: any[] = []
    if (interaction.isCommand() && command.options) {
        const options = interaction.options
        args = command.options?.map((option, i) => {
            switch (option.type) {
                case 'BOOLEAN': return options.getBoolean(option.name)
                case 'CHANNEL' : return options.getChannel(option.name)
                case 'INTEGER': return options.getInteger(option.name)
                case 'MENTIONABLE': return options.getMentionable(option.name)
                case 'NUMBER': return options.getNumber(option.name)
                case 'STRING': return options.getString(option.name)
                case 'USER': return command.guildOnly ? options.getMember(option.name) : options.getUser(option.name)
            }
        })
    }

    try {
        const reply = command.run({
            client,
            inter: interaction,
            message: interaction.isMessageContextMenu() ? interaction.targetMessage : undefined,
            cmdInter:  interaction.isCommand() ? interaction: undefined,
            msgInter: interaction.isMessageContextMenu() ? interaction: undefined,
            usrInter: interaction.isUserContextMenu() ? interaction: undefined,
            member: interaction.member,
            user: interaction.user,
            channel: interaction.channel,
            channelId: interaction.channelId,
            guild: interaction.guild,
            guildId: interaction.guildId,
            reply: async (options: any) => {
                if (!interaction.replied) {
                    await interaction.reply(options)
                } else {
                    return await interaction.followUp(options)
                }
            },
            fetchedReply: async (options: any) => {
                if (!interaction.replied) {
                    await interaction.reply(options)
                    return interaction.fetchReply()
                } else {
                    return await interaction.followUp(options)
                }
            }
        }, ...args)
    }
    catch (err) {
        if (err instanceof Error && err.toString().startsWith('?'))
            interaction.reply({
                content: err.toString(),
                ephemeral: true
            })
        else 
            console.error(err)
    }
}

const handleButton = (client: Client, interaction: ButtonInteraction) => {
    const [name, ...params] = interaction.customId.split('-')

    const button = client.buttons.get(name)

    if (!button) return
    button.run({ client, interaction }, ...params)
}