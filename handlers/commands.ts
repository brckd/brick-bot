import { getFiles } from './functions'
import fs from 'fs'
import { Client, CommandTemplate } from '.'
import path from 'path'

export default (client: Client) => {
    const ext = '.ts'
    const commands = fs.readdirSync(client.commandsDir)
    
    commands.forEach((category) => {
        getFiles(path.join(client.commandsDir, category), ext).forEach((p) => {
            delete require.cache[require.resolve(p)]

            const command = require(p).default as CommandTemplate
            if (!command)
                return console.error(`Command at ${p} is undefined`)
            
            command.name = command.name || path.basename(p, ext)
            command.category = command.category || category
            client.commands.set(command.name, command)
        })
    })

    return commands
}