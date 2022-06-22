import Discord from 'discord.js'
import Builders from '@discordjs/builders'

export type CommandArg = string | boolean | Discord.User | Discord.GuildMember | Discord.Channel | Discord.Role | number | Discord.MessageAttachment

export interface ChatCommandData {
    data: Omit<Builders.SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    run: (interaction: Discord.CommandInteraction | Discord.Message, ...args: CommandArg[]) => Discord.Awaitable<void>
}

export interface ChatCommand {
    data: ReturnType<typeof Builders.SlashCommandBuilder.prototype.toJSON>
    run: ChatCommandData['run']
}