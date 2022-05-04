import { getFiles } from './functions'
import { Client, SlashCommand } from '.'
import path from 'path'

export default (client: Client) => {
    const ext = '.ts'
    const slashcommands = getFiles(client.slashCommandsDir, ext)

    slashcommands.forEach((p) => {
        delete require.cache[require.resolve(p)]

        const slash = require(p).default as SlashCommand
        if (!slash)
            return console.error(`Event at ${p} is undefined`)
        
        slash.name = slash.name || path.basename(p, ext)
        client.slashcommands.set(slash.name, slash)
    })

    return slashcommands
}