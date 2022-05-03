import { Client } from ".";
import { getFiles } from "./functions";

export default (client: Client, reload: boolean) => {
    const ending = '.ts'
    let events = getFiles('events/', ending)

    events.forEach((f, i) => {
        if (reload)
            delete require.cache[require.resolve(`../events/${f}`)]

        const event = require(`../events/${f}`).default
        const name = event.name || f.slice(0, f.length-ending.length)
        client.events.set(name, event)

        if (!reload)
            client.on(name, (...args) => {
                triggerEventHandler(client, name, ...args)
            })
    })

    console.log(`Loaded ${events.length} event${events.length===1?'':'s'}`)
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