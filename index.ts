import 'dotenv/config'
import { Client } from './handlers'

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_REACTIONS'
    ],
    partials: [
        'CHANNEL',
        'REACTION'
    ],

    allowedMentions: {users: [], roles: [], repliedUser: false},
    
    prefix: '!',
    color: 'BLURPLE',
    owners: ['691572882148425809'],
    testGuilds: ['968171159776559174']
})

client.login(process.env.TOKEN)