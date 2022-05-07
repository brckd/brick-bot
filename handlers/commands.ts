import { getFiles } from './functions'
import fs from 'fs'
import { Client, Command, CommandTemplate } from '.'
import path from 'path'

export default (client: Client) => {
    const ext = '.ts'
    let commands = 0
    
    fs.readdirSync(client.commandsDir).forEach((category) => {
        getFiles(path.join(client.commandsDir, category), ext).forEach((p) => {
            delete require.cache[require.resolve(p)]

            const command = require(p).default as CommandTemplate
            if (!command)
                return console.error(`Command at ${p} is undefined`)
                
            commands++
            
            command.name = command.name ?? path.basename(p, ext)
            command.category = command.category ?? category
            for (let type of command.types) {
                const c = {...command} as Command

                if (['USER', 'MESSAGE'].includes(type)) {
                    c.description = ''
                    if (type === 'USER')
                        c.name = c.name.toUpperCase()
                    if (type === 'MESSAGE')
                        c.name = c.name.replace(/\b[a-z]/g, c=>c.toUpperCase())
                } 
                if (['LEGACY', 'SLASH'].includes(type)) {
                    c.name = c.name.toLowerCase()
                }
                
                c.type = ['LEGACY', 'SLASH', 'USER', 'MESSAGE'].indexOf(type) as 0|1|2|3
                client.commands.set(c.name, c)
            }
            
        })
    })

    return commands
}