import { CommandTemplate } from "handlers"

export default {
    types: ['LEGACY', 'SLASH'],
    description: 'Replies with the bot\'s uptime',
    
    run: ({ client, reply }) => {
        reply({
            description: `Online <t:${Math.round(client.readyTimestamp!/1000)}:R>`
        })
    }
} as CommandTemplate