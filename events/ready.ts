import { IEvent } from "../handlers"

export default {
    run: async (client) => {
        client.guilds.cache.forEach(guild => {
            guild.commands.set(client.testGuilds?.includes(guild.id) ? [...client.slashcommands.values()] : [])
        })

        // client.testGuilds.forEach((guildId) => {
        //     const guild = client.guilds.cache.get(guildId)
        //     if (!guild)
        //         return console.error(`Test guild \`${guildId}\` not found`)
            
        //     guild.commands.set([])
        // })

        client.application?.commands.set(client.testGuilds ? [] : [...client.slashcommands.values()])

        console.log(`Loaded ${client.slashcommands.size} slashcommand${client.slashcommands.size===1?'':'s'}`)

        console.log(`Logged in as ${client.user?.tag}`)
    }
} as IEvent