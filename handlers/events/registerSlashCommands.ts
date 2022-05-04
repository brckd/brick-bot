import { Command, EventTemplate } from ".."

export default {
    name: 'ready',
    run: (client) => {
        const slashes = [...client.commands.values()].filter(c=>c.slash) as Command[]
        
        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.testGuilds?.includes(guild.id) ? slashes : [])
            console.log(guild.name)
        })
        console.log(slashes)

        client.application?.commands.set(client.testGuilds ? [] : slashes)
    }
} as EventTemplate