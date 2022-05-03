import Discord, { Message } from 'discord.js'
import eventHandler from './events'
import commandHandler from './commands'

export interface IEvent {
    run: {
        (client: Client, ...args: any[]): void
    },
    name?: string
}

export interface ICommand {
    run: {
        (context: {client: Client, message: Message}, ...args: any[]): void
    },
    name?: string
    category?: string
    permissions?: Discord.PermissionResolvable | []
    devOnly?: boolean

}

interface ClientOptions extends Discord.ClientOptions {
    prefix?: string
    owners?: string[]
}

export interface Client extends Discord.Client {
    prefix: string,
    owners: string[]

    events: Discord.Collection<string, IEvent>
    eventsDir: string
    loadEvents: (reload: boolean) => void

    commands: Discord.Collection<string, ICommand>
    commandsDir: string
    loadCommands: (reload: boolean) => void
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)
        this.prefix = options.prefix || '!'
        this.owners = options.owners || []

        this.events = new Discord.Collection()
        this.loadEvents = (reload: boolean) => eventHandler(this, reload)
        this.loadEvents(false)

        this.commands = new Discord.Collection()
        this.loadCommands = (reload: boolean) => commandHandler(this, reload)
        this.loadCommands(false)
    }
}