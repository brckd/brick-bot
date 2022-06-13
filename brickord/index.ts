import Discord, { Awaitable } from 'discord.js'
import Builders from '@discordjs/builders'
import path from 'path'
import { loadCommands } from './loaders/commands'
import { loadEvents } from './loaders/events'

export interface SlashCommandData {
    data: Builders.SlashCommandBuilder
    run: (interaction: Discord.CommandInteraction | Discord.Message, ...args: any[]) => Awaitable<void>
}

export interface SlashCommand {
    data: ReturnType<typeof Builders.SlashCommandBuilder.prototype.toJSON>
    run: SlashCommandData['run']
}

export interface ClientEvents extends Discord.ClientEvents {
    commandError: [interaction: Discord.Message | Discord.CommandInteraction | Discord.UserContextMenuInteraction | Discord.MessageContextMenuInteraction, err: Error]
}

export interface EventData<Name extends keyof ClientEvents> {
    name?: Name
    run: (client: Client, ...args: ClientEvents[Name]) => Awaitable<void>
}

export interface ClientOptions extends Discord.ClientOptions {
    prefix?: string | RegExp | (string | RegExp)[]
    color?: Discord.ColorResolvable
    owners?: string[]
    testGuilds?: string[]

    eventsDir?: string
    commandsDir?: string
    buttonsDir?: string
}

const root = path.dirname(require.main!.filename)

export interface Client extends Discord.Client {
    prefix: (string | RegExp)[]
    color?: Discord.ColorResolvable
    owners: string[]
    testGuilds?: string[]

    eventsDir: string
    events: Discord.Collection<string, EventData<keyof Discord.ClientEvents>>
    loadEvents: (dir?: string) => void

    commandsDir: string
    commands: Discord.Collection<string, SlashCommand>
    loadCommands: (dir?: string) => void
    
    emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean
    emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]): boolean

    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this
    on<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, listener: (...args: any[]) => Awaitable<void>): this
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)

        this.prefix = options.prefix instanceof Array ? options.prefix ?? ['!'] : [options.prefix ?? '!']
        this.color = options.color
            
        this.owners = options.owners ?? []
        this.testGuilds = options.testGuilds

        this.eventsDir = options.eventsDir ?? path.join(root, 'events')
        this.events = new Discord.Collection()
        this.loadEvents = (dir) => loadEvents(this, dir)
        this.loadEvents()
        this.loadEvents(path.join(__dirname, 'events'))

        this.commandsDir = options.commandsDir ?? path.join(root, 'commands')
        this.commands = new Discord.Collection()
        this.loadCommands = (dir) => loadCommands(this, dir)
        this.loadCommands()
    }
}