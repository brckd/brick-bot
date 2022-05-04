import { Command, EventTemplate } from ".."

export default {
    name: 'ready',
    run: (client) => {
        const slashes = [...client.commands.values()].filter(c=>c.slash) as Command[]
        
        client.testGuilds?.forEach(guild => {
            client.guilds.cache.get(guild)?.commands.set(slashes)
        })

        client.application?.commands.set(client.testGuilds ? [] : slashes)
    }
} as EventTemplate