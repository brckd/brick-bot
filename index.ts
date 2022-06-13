import { Client } from './brickord'
import 'dotenv/config'

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES'
    ],
    partials: [
        'CHANNEL'
    ],

    allowedMentions: {users: [], roles: [], repliedUser: false},
    prefix: '!'
})

client.login(process.env.TOKEN)