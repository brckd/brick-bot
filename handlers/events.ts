import { Client, EventTemplate } from ".";
import { getFiles } from "./functions";
import path from 'path'

export default (client: Client, dir?: string) => {
    const ext = '.ts'
    let events = getFiles(dir || client.eventsDir, ext)

    events.forEach((p) => {
        delete require.cache[require.resolve(p)]

        const event = require(p).default as EventTemplate
        if (!event)
            return console.error(`Event at ${p} is undefined`)
        
        const filename = path.basename(p, ext)
        event.name = event.name || filename

        if (!client.events.has(filename))
            client.on(event.name, (...args) => {
                triggerEventHandler(client, filename, ...args)
            })

        client.events.set(filename, event)
    })
    
    return events
}

function triggerEventHandler(
    client: Client,
    event: string,
    ...args: string[]
) {
    try {
        if (client.events.has(event))
            client.events.get(event)?.run(client, ...args)
    }
    catch (err) {
        console.error((err))
    }
}