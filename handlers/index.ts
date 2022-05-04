import Discord, { ApplicationCommandData, ApplicationCommandOptionData, ButtonInteraction, Collection, CommandInteraction, DMChannel, Guild, GuildMember, InteractionReplyOptions, Message, MessagePayload, NewsChannel, PartialDMChannel, PermissionResolvable, ReplyMessageOptions, TextBasedChannel, TextChannel, ThreadChannel, User } from 'discord.js'
import eventHandler from './events'
import commandHandler from './commands'
import buttonHandler from './buttons'
import path from 'path'

export interface EventTemplate {
    run: {
        (client: Client, ...args: any[]): void
    },
    name?: string
}

export type CommandTemplate = Partial<ApplicationCommandData> & {
    name?: string
    description?: string
    category?: string
    options?: ApplicationCommandOptionData[]
    slash?: boolean | 'both'
    permissions?: PermissionResolvable | []
    devOnly?: boolean
    guildOnly?: boolean
    run: {
        (context: {
            client: Client,
            message?: Message,
            interaction?: CommandInteraction,
            member: GuildMember | null,
            user: User,
            channel: TextChannel | TextBasedChannel | DMChannel | PartialDMChannel | NewsChannel | ThreadChannel | null
            channelId: string,
            guild: Guild | null,
            guildId?: string | null,
            reply: (options: string | MessagePayload | ReplyMessageOptions | InteractionReplyOptions) => Promise<Message | void>
        }, ...args: any[]): void
    }
}

export type Command = CommandTemplate & ApplicationCommandData

export interface ButtonTemplate {
    run: {
        (context: {client: Client, interaction: ButtonInteraction}, ...args: string[]): void
    },
    name?: string
}

interface ClientOptions extends Discord.ClientOptions {
    prefix?: string
    owners?: string[]
    testGuilds?: string[]

    eventsDir?: string
    commandsDir?: string
    buttonsDir?: string
}

export interface Client extends Discord.Client {
    prefix: string
    owners: string[]
    testGuilds?: string[]

    eventsDir: string
    events: Collection<string, EventTemplate>
    loadEvents: (dir?: string) => string[]

    commandsDir: string
    commands: Collection<string, CommandTemplate>
    loadCommands: (dir?: string) => string[]

    buttonsDir: string
    buttons: Collection<string, ButtonTemplate>
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
        
        this.buttonsDir = options.buttonsDir || path.join(root, 'buttons')
        this.buttons = new Discord.Collection()
        this.loadButtons = () => buttonHandler(this)
        console.log(`Loaded ${this.loadButtons().length} button(s)`)
    }
}