import { getFiles } from './functions'
import { Client, ButtonTemplate } from '.'
import path from 'path'

export default (client: Client) => {
    const ext = '.ts'
    let buttons = 0

    getFiles(client.buttonsDir, ext).forEach((p) => {
        delete require.cache[require.resolve(p)]

        const button = require(p).default as ButtonTemplate
        if (!button)
            return console.error(`Button at ${p} is undefined`)

        buttons++

        button.name = button.name ?? path.basename(p, ext)
        client.buttons.set(button.name, button)
    })

    return buttons
}