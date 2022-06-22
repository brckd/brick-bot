import Discord from 'discord.js'
import Builders from '@discordjs/builders'

export interface ChatCommandData {
    data: Builders.SlashCommandBuilder
    run: (interaction: Discord.CommandInteraction | Discord.Message, ...args: any[]) => Discord.Awaitable<void>
}

export interface ChatCommand {
    data: ReturnType<typeof Builders.SlashCommandBuilder.prototype.toJSON>
    run: ChatCommandData['run']
}