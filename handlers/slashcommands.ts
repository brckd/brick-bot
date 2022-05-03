import { getFiles } from './functions'
import { Client, SlashCommand } from '.'

export default (client: Client, reload: boolean) => {
    const ending = '.ts'

    getFiles('slashcommands/', ending).forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../slashcommands/${f}`)]

        const slash = require(`../slashcommands/${f}`).default as SlashCommand
        if (!slash)
            return console.error(`Event at ${f} is undefined`)

        slash.name = slash.name || f.slice(0, f.length-ending.length)
        client.slashcommands.set(slash.name, slash)
    })
}