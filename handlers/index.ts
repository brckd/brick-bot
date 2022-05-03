import Discord, { ApplicationCommandData, CommandInteraction, Message } from 'discord.js'
import eventHandler from './events'
import commandHandler from './commands'
import slashCommandHandler from './slashcommands'

export interface EventTemplate {
    run: {
        (client: Client, ...args: any[]): void
    },
    name?: string
}

export interface CommandTemplate {
    run: {
        (context: {client: Client, message: Message}, ...args: any[]): void
    },
    name?: string
    category?: string
    permissions?: Discord.PermissionResolvable | []
    devOnly?: boolean
}

export type SlashCommandTemplate = Partial<ApplicationCommandData> & {
    run: {
    (context: {client: Client, interaction: CommandInteraction}, ...args: any[]): void
    }
    permissions?: Discord.PermissionResolvable | []
    name?: string
}

export type SlashCommand = ApplicationCommandData & {
    run: {
    (context: {client: Client, interaction: CommandInteraction}, ...args: any[]): void
    }
    permissions?: Discord.PermissionResolvable | []
    name?: string
}


interface ClientOptions extends Discord.ClientOptions {
    prefix?: string
    owners?: string[]
    testGuilds?: string[]
}

export interface Client extends Discord.Client {
    prefix: string
    owners: string[]
    testGuilds?: string[]

    events: Discord.Collection<string, EventTemplate>
    eventsDir: string
    loadEvents: (reload: boolean) => void

    commands: Discord.Collection<string, CommandTemplate>
    commandsDir: string
    loadCommands: (reload: boolean) => void

    slashcommands: Discord.Collection<string, SlashCommand>
    slashcommandDir: string
    loadSlashCommands: (reload: boolean) => void
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)
        this.prefix = options.prefix || '!'
        this.owners = options.owners || []
        this.testGuilds = options.testGuilds

        this.events = new Discord.Collection()
        this.loadEvents = (reload: boolean) => eventHandler(this, reload)
        this.loadEvents(false)

        this.commands = new Discord.Collection()
        this.loadCommands = (reload: boolean) => commandHandler(this, reload)
        this.loadCommands(false)
        
        this.slashcommands = new Discord.Collection()
        this.loadSlashCommands = (reload: boolean) => slashCommandHandler(this, reload)
        this.loadSlashCommands(false)
    }
}