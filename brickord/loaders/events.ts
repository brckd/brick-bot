import { Client, type EventData, getFiles } from '..'
import Discord from 'discord.js'
import path from 'path'

export function loadEvents(client: Client, dir?: string) {
    getFiles(dir ?? client.eventsDir).forEach( file => {
        delete require.cache[require.resolve(file)]

        const event = require(file).default as EventData<keyof Discord.ClientEvents>
        const filename = path.basename(file).slice(0, -3)
        const name = (event.name ?? filename) as keyof Discord.ClientEvents
        
        if (!client.events.has(filename))
            client.on(name, (...args) => client.events.get(filename)?.run(client, ...args))

        client.events.set(filename, event)
    })
}