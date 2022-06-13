import { Client, type SlashCommandData, type SlashCommand } from '..'
import { getFiles } from '../utils'
import path from 'path'

export function loadCommands(client: Client, dir?: string) {
    getFiles(dir ?? client.commandsDir).forEach( file => {
        delete require.cache[require.resolve(file)]
        
        const cmds = require(file) as { [key: string]: SlashCommandData }
        for (const c in cmds) {
            const name = cmds[c].data.name
                ?? c === 'default'
                ? path.basename(file).slice(0, -3)
                : c
            
            const cmd = Object.assign(cmds[c], { data: cmds[c].data.setName(name).toJSON() }) as SlashCommand

            client.commands.set(
                name,
                cmd
            )
        }
    })
}