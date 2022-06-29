import { Client } from ".."
import Discord from 'discord.js'

export interface EventData<Name extends keyof Discord.ClientEvents> {
    name?: Name
    run: (client: Client, ...args: Discord.ClientEvents[Name]) => Discord.Awaitable<void>
}