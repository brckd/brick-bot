import { CommandTemplate } from "../../handlers"

const replacements = {
    'r': 'w',
    'l': 'w',
    's': 'z',
    'y': 'i'
} as {[key: string]: string}

export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Fuwwyfy your text',

    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text to fuwwyfy',
            required: true
        }
    ],

    run: ({ reply }, ...text) => {
        reply(
            text.join(' ').split('').map(c => replacements[c] ?? c).join('')
        )
    }
} as CommandTemplate