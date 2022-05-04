import { Client, EventTemplate } from ".";
import { getFiles } from "./functions";
import path from 'path'

export default (client: Client, reload: boolean) => {
    const ext = '.ts'
    let events = getFiles(client.eventsDir, ext)

    events.forEach((p, i) => {

        if (reload)
            delete require.cache[require.resolve(p)]

        const event = require(p).default as EventTemplate
        if (!event)
            return console.error(`Event at ${p} is undefined`)

        const name = event.name || path.basename(p, ext)
        client.events.set(name, event)

        if (!reload)
            client.on(name, (...args) => {
                triggerEventHandler(client, name, ...args)
            })
    })

    console.log(`Loaded ${client.events.size} event${client.events.size===1?'':'s'}`)
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