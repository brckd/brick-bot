import { Client } from 'brickord.js'
import 'dotenv/config'

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_REACTIONS'
    ],
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION'
    ],

    allowedMentions: {users: [], roles: [], repliedUser: false},
    prefix: ['!', m => m.client.user?.toString()]
})

client.login(process.env.TOKEN)
