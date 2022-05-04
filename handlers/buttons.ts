import { getFiles } from './functions'
import { Client, ButtonTemplate } from '.'

export default (client: Client, reload: boolean) => {
    const ending = '.ts'

    getFiles('buttons/', ending).forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../buttons/${f}`)]

        const slash = require(`../buttons/${f}`).default as ButtonTemplate
        if (!slash)
            return console.error(`Event at ${f} is undefined`)

        slash.name = slash.name || f.slice(0, f.length-ending.length)
        client.buttons.set(slash.name, slash)
    })
}