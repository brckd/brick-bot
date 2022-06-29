import Discord from 'discord.js'
import Builders from '@discordjs/builders'

export const commandOptions = ['Subcommand', 'Subcommand Group', 'String', 'Integer', 'Boolean', 'Member', 'Channel', 'Role', 'Mentionable', 'Number', 'Attachment'] as const

export type CommandOption = string | number | boolean | Discord.User | Discord.GuildMember | Discord.Channel | Discord.Role | Discord.MessageAttachment | undefined

export interface ChatCommandData {
    data: Omit<Builders.SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    run: (interaction: Discord.CommandInteraction | Discord.Message, ...args: CommandOption[]) => Discord.Awaitable<void>
}

export interface ChatCommand {
    data: ReturnType<typeof Builders.SlashCommandBuilder.prototype.toJSON>
    run: ChatCommandData['run']
}