import { getFiles } from './functions'
import { Client, ISlashCommand } from '.'

export default (client: Client, reload: boolean) => {
    const ending = 'ts'

    getFiles('slashcommands/', ending).forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../slashcommands/${f}`)]

        const slash = require(`../slashcommands/${f}`).default
        client.slashcommands.set(slash.name || f.slice(0, f.length-ending.length), slash)
    })
}