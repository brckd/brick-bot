import Discord, { ApplicationCommandData, ApplicationCommandOptionData, ButtonInteraction, CommandInteraction, Message } from 'discord.js'
import eventHandler from './events'
import commandHandler from './commands'
import slashCommandHandler from './slashcommands'
import buttonHandler from './buttons'
import path from 'path'
import { getFiles } from './functions'

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

export interface ButtonTemplate {
    run: {
        (context: {client: Client, interaction: ButtonInteraction}, ...args: string[]): void
    },
    name?: string
}

export type SlashCommandTemplate = Partial<ApplicationCommandData> & {
    run: {
    (context: {client: Client, interaction: CommandInteraction}, ...args: any[]): void
    }
    permissions?: Discord.PermissionResolvable | []
    name?: string
    options?: ApplicationCommandOptionData[]
    guildOnly?: boolean
}

export type SlashCommand = ApplicationCommandData & {
    run: {
    (context: {client: Client, interaction: CommandInteraction}, ...args: any[]): void
    }
    permissions?: Discord.PermissionResolvable | []
    name?: string
    options?: ApplicationCommandOptionData[]
    guildOnly?: boolean
}

interface ClientOptions extends Discord.ClientOptions {
    prefix?: string
    owners?: string[]
    testGuilds?: string[]

    eventsDir?: string
    commandsDir?: string
    slashCommandsDir?: string
    buttonsDir?: string
}

export interface Client extends Discord.Client {
    prefix: string
    owners: string[]
    testGuilds?: string[]

    eventsDir: string
    events: Discord.Collection<string, EventTemplate>
    loadEvents: (dir?: string) => string[]

    commandsDir: string
    commands: Discord.Collection<string, CommandTemplate>
    loadCommands: (dir?: string) => string[]

    slashCommandsDir: string
    slashcommands: Discord.Collection<string, SlashCommand>
    loadSlashCommands: (dir?: string) => string[]

    buttonsDir: string
    buttons: Discord.Collection<string, ButtonTemplate>
    loadButtons: (dir?: string) => string[]
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)
        this.prefix = options.prefix || '!'
        this.owners = options.owners || []
        this.testGuilds = options.testGuilds

        const root = path.dirname(require.main!.filename)

        this.eventsDir = options.eventsDir || path.join(root, 'events')
        this.events = new Discord.Collection()
        this.loadEvents = () => eventHandler(this)
        console.log(`Loaded ${this.loadEvents().length} event(s) (+ ${eventHandler(this, path.join(__dirname, 'events')).length} builtin)`)

        this.commandsDir = options.commandsDir || path.join(root, 'commands')
        this.commands = new Discord.Collection()
        this.loadCommands = () => commandHandler(this)
        console.log(`Loaded ${this.loadCommands().length} command(s)`)

        this.slashCommandsDir = options.slashCommandsDir || path.join(root, 'slashcommands')
        this.slashcommands = new Discord.Collection()
        this.loadSlashCommands = () => slashCommandHandler(this)
        console.log(`Loaded ${this.loadSlashCommands().length} slashcommand(s)${this.testGuilds ? ' in '+this.testGuilds.length+' guild(s)' : ''}`)
        
        this.buttonsDir = options.buttonsDir || path.join(root, 'buttons')
        this.buttons = new Discord.Collection()
        this.loadButtons = () => buttonHandler(this)
        console.log(`Loaded ${this.loadButtons().length} button(s)`)
    }
}