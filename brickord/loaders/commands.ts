import { Client, type ChatCommandData, type ChatCommand, getAllFiles } from '..'
import path from 'path'

export function loadCommands(client: Client, dir?: string) {
    getAllFiles(dir ?? client.commandsDir).forEach( file => {
        delete require.cache[require.resolve(file)]
        
        const cmds = require(file) as { [key: string]: ChatCommandData }
        for (const c in cmds) {
            const name = cmds[c].data.name ?? c.replace('default', path.basename(file).slice(0, -3))
            
            const cmd = Object.assign(cmds[c], { data: cmds[c].data.setName(name).toJSON() }) as ChatCommand

            client.commands.set(
                name,
                cmd
            )
        }
    })
}