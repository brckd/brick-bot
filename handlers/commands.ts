import { getFiles } from './functions'
import fs from 'fs'
import { Client } from '.'

export default (client: Client, reload: boolean) => {
    const ending = '.ts'
    fs.readdirSync('commands/').forEach((category) => {
        const files = getFiles(`commands/${category}`, ending)

        files.forEach((f) => {
            if (reload) {
                delete require.cache[require.resolve(`commands/${category}/${f}`)]
            }
            const command = require(`../commands/${category}/${f}`).default
            command.name = command.name || f.slice(0, f.length-ending.length)
            command.category = command.category || category
            client.commands.set(command.name, command)
        })
    })
    console.log(`Loaded ${client.commands.size} command${client.commands.size===1?'':'s'}`)
}