import { CommandTemplate } from "handlers"

export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Repeats what you said',

    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text to repeat',
            required: true
        }
    ],

    run: ({ cmdInter, channel }, ...text) => {
        channel?.send(text.join(' '))
        cmdInter?.reply({ content: 'Text sent', ephemeral: true })
    }
} as CommandTemplate