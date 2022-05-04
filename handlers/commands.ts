import { getFiles } from './functions'
import fs from 'fs'
import { Client, CommandTemplate } from '.'
import path from 'path'

export default (client: Client, reload: boolean) => {
    const ext = '.ts'

    fs.readdirSync(client.commandsDir).forEach((category) => {
        getFiles(path.join(client.commandsDir, category), ext).forEach((p) => {
            if (reload)
                delete require.cache[require.resolve(p)]

            const command = require(p).default as CommandTemplate
            if (!command)
                return console.error(`Command at ${p} is undefined`)

            command.name = command.name || path.basename(p, ext)
            command.category = command.category || category
            client.commands.set(command.name, command)
        })
    })

    console.log(`Loaded ${client.commands.size} command${client.commands.size===1?'':'s'}`)
}