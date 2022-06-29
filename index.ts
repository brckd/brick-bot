import Brickord from './brickord'
import 'dotenv/config'

const client = new Brickord.Client({
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
    prefix: '!'
})

client.login(process.env.TOKEN)