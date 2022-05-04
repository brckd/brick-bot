import { EventTemplate } from "../handlers"

export default {
    run: (client) => {
        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.testGuilds?.includes(guild.id) ? [...client.slashcommands.values()] : [])
        })

        client.application?.commands.set(client.testGuilds ? [] : [...client.slashcommands.values()])

        console.log(`Loaded ${client.slashcommands.size} slashcommand${client.slashcommands.size===1?'':'s'}`)

        console.log(`Logged in as ${client.user?.tag}`)
    }
} as EventTemplate