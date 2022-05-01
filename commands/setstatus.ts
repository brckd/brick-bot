import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the bot status',
    slash: 'both',
    testOnly: true,

    minArgs: 1,
    expectedArgs: '<status>',

    callback: ({ client, text }) => {
        client.user?.setPresence({
            activities: [{
                name: text
            }]
        })
        return `Status updated to\n> ${text}`
    }
} as ICommand