import { getFiles } from './functions'
import { Client, ButtonTemplate } from '.'
import path from 'path'

export default (client: Client, reload: boolean) => {
    const ext = '.ts'

    getFiles(client.buttonsDir, ext).forEach((p) => {
        if (reload)
            delete require.cache[require.resolve(p)]

        const slash = require(p).default as ButtonTemplate
        if (!slash)
            return console.error(`Button at ${p} is undefined`)

        slash.name = slash.name || path.basename(p, ext)
        client.buttons.set(slash.name, slash)
    })
}