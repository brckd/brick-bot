import Discord, { Channel, GuildMember, MessageAttachment, Role } from 'discord.js'

export interface IEvent {
    run: {
        (client: Client, ...args: any[]): void
    },

    name?: string
}

interface ClientOptions extends Discord.ClientOptions {
    prefix?: string
    owners?: string[]
}

export interface Client extends Discord.Client {
    prefix: string,
    owners: string[]
    events: Discord.Collection<string, IEvent>
    commands: Discord.Collection<string, any>
    eventsDir: string
    loadEvents: (reload: boolean) => void
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)
        this.prefix = options.prefix || '!'
        this.owners = options.owners || []
    }
}