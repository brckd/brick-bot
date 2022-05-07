import { EventTemplate, Command } from ".."

export default {
    name: 'ready',
    run: (client) => {
        const commands = [...client.commands.values()].filter(c => c.type >= 1)
    
        client.testGuilds?.forEach(guild => {
            client.guilds.cache.get(guild)?.commands.set(commands)
        })

        client.application?.commands.set(client.testGuilds ? [] : commands)
    }
} as EventTemplate