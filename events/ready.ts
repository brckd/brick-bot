import { EventTemplate } from "handlers";

export default {
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}`)
        client.prefix.push(client.user!.toString())

        client.user?.setPresence({activities: [{
            type: 'PLAYING',
            name: 'Connecting'
        }]})
        setTimeout(() => {
            client.user?.setPresence({activities: [{
                type: 'LISTENING',
                name: '!help'
            }]})
        }, 1000 * 5)
    }
} as EventTemplate