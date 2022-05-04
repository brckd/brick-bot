import { EventTemplate } from ".."

export default {
    name: 'ready',
    run: (client) => {
        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.testGuilds?.includes(guild.id) ? [...client.slashcommands.values()] : [])
        })

        client.application?.commands.set(client.testGuilds ? [] : [...client.slashcommands.values()])
    }
} as EventTemplate