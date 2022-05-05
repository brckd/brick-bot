import { CommandTemplate } from "../../handlers"

export default {
    description: 'Repeats what you said',
    slash: 'both',

    options: [
        {
            name: 'text',
            type: 'STRING',
            description: 'The text to repeat',
            required: true
        }
    ],

    run: ({ interaction, channel }, ...text) => {
        channel?.send(text.join(' '))
        interaction?.reply({ content: 'Text sent', ephemeral: true })
    }
} as CommandTemplate