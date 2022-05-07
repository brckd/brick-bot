import Discord, { ApplicationCommandOptionData, ButtonInteraction, Collection, CommandInteraction, DMChannel, Guild, GuildMember, Interaction, InteractionReplyOptions, Message, MessageContextMenuInteraction, MessageInteraction, MessagePayload, NewsChannel, PartialDMChannel, PermissionResolvable, ReplyMessageOptions, TextBasedChannel, TextChannel, ThreadChannel, User, UserContextMenuInteraction } from 'discord.js'
import { APIMessage } from 'discord-api-types/v9'
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

export interface CommandTemplate {
    types: ('LEGACY' | 'SLASH' | 'USER' | 'MESSAGE')[]
    type?: 0 | 1 | 2 | 3
    name?: string
    category?: string
    description?: string
    options?: ApplicationCommandOptionData[]
    permissions?: PermissionResolvable | []
    devOnly?: boolean
    guildOnly?: boolean
    
    run: {
        (context: {
            client: Client,
            message?: Message | APIMessage,
            inter?: Interaction,
            cmdInter?: CommandInteraction,
            msgInter?: MessageContextMenuInteraction,
            usrInter?: UserContextMenuInteraction,
            member: GuildMember | null,
            user: User,
            channel: TextChannel | TextBasedChannel | DMChannel | PartialDMChannel | NewsChannel | ThreadChannel | null
            channelId: string,
            guild: Guild | null,
            guildId?: string | null,
            reply: (options: string | MessagePayload | ReplyMessageOptions | InteractionReplyOptions) => Promise<Message | APIMessage | void>
            fetchedReply: (options: string | MessagePayload | ReplyMessageOptions | InteractionReplyOptions) => Promise<Message | APIMessage>
        }, ...args: any[]): void
    }
}

export interface Command extends CommandTemplate {
    type: 0 | 1 | 2 | 3
    name: string
    description: string
    category: string
}

export interface ButtonTemplate {
    run: {
        (context: {client: Client, interaction: ButtonInteraction}, ...args: string[]): void
    },
    name?: string
}

interface ClientOptions extends Discord.ClientOptions {
    prefix?: string | RegExp | (string | RegExp)[]
    owners?: string[]
    testGuilds?: string[]

    eventsDir?: string
    commandsDir?: string
    buttonsDir?: string
}

export interface Client extends Discord.Client {
    prefix: (string | RegExp)[]
    owners: string[]
    testGuilds?: string[]

    eventsDir: string
    events: Collection<string, EventTemplate>
    loadEvents: (dir?: string) => number

    commandsDir: string
    commands: Collection<string, Command>
    loadCommands: (dir?: string) => number
    categories: Collection<string, Collection<string, Command>>

    buttonsDir: string
    buttons: Collection<string, ButtonTemplate>
    loadButtons: (dir?: string) => number
}

export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)

        this.prefix = options.prefix instanceof Array ? options.prefix ?? ['!'] : [options.prefix ?? '!']
            
        this.owners = options.owners ?? []
        this.testGuilds = options.testGuilds

        const root = path.dirname(require.main!.filename)

        this.eventsDir = options.eventsDir ?? path.join(root, 'events')
        this.events = new Discord.Collection()
        this.loadEvents = () => eventHandler(this)
        console.log(`Loaded ${this.loadEvents()} event(s) (+ ${eventHandler(this, path.join(__dirname, 'events'))} builtin)`)

        this.commandsDir = options.commandsDir ?? path.join(root, 'commands')
        this.commands = new Discord.Collection()
        this.categories = new Discord.Collection()
        this.loadCommands = () => commandHandler(this)
        console.log(`Loaded ${this.loadCommands()} command(s)`)
        
        this.buttonsDir = options.buttonsDir ?? path.join(root, 'buttons')
        this.buttons = new Discord.Collection()
        this.loadButtons = () => buttonHandler(this)
        console.log(`Loaded ${this.loadButtons()} button(s)`)
    }
}