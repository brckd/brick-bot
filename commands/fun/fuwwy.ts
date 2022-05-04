import { CommandTemplate } from "../../handlers"

export default {
    description: 'Fuwwyfy your text',
    slash: 'both',

    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text to fuwwyfy',
            required: true
        }
    ],

    run: ({ reply }, ...text) => {
        reply(text.join(' ').replace(/[rl]/g, 'w').replace('s', 'z'))
    }
} as CommandTemplate