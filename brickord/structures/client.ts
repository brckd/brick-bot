import Discord from 'discord.js'
import { loadCommands, loadEvents, EventData, ChatCommand, mainRoot, libRoot } from '..'
import path from 'path'

declare module 'discord.js' {
    interface ClientEvents {
        commandError: [interaction: Discord.Message | Discord.CommandInteraction | Discord.UserContextMenuInteraction | Discord.MessageContextMenuInteraction, err: Error]
    }
    
    interface Client {
        prefix: (string | RegExp)[]
        color?: Discord.ColorResolvable
        owners: string[]
        testGuilds?: string[]
    
        eventsDir: string
        events: Discord.Collection<string, EventData<keyof Discord.ClientEvents>>
        loadEvents: (dir?: string) => void
    
        commandsDir: string
        commands: Discord.Collection<string, ChatCommand>
        loadCommands: (dir?: string) => void
    }
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


export class Client extends Discord.Client {
    constructor(options: ClientOptions) {
        super(options)

        this.prefix = options.prefix instanceof Array ? options.prefix ?? ['!'] : [options.prefix ?? '!']
        this.color = options.color
            
        this.owners = options.owners ?? []
        this.testGuilds = options.testGuilds

        this.eventsDir = options.eventsDir ?? path.join(mainRoot, 'events')
        this.events = new Discord.Collection()
        this.loadEvents = (dir) => loadEvents(this, dir)
        this.loadEvents()
        this.loadEvents(path.join(libRoot, 'events'))

        this.commandsDir = options.commandsDir ?? path.join(mainRoot, 'commands')
        this.commands = new Discord.Collection()
        this.loadCommands = (dir) => loadCommands(this, dir)
        this.loadCommands()
        this.loadCommands(path.join(libRoot, 'commands'))
    }
}