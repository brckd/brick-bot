import { ClientEvents, Client } from ".."
import Discord from 'discord.js'

export interface EventData<Name extends keyof ClientEvents> {
    name?: Name
    run: (client: Client, ...args: ClientEvents[Name]) => Discord.Awaitable<void>
}