import { SapphireClient } from '@sapphire/framework'
import 'dotenv/config'


const client = new SapphireClient({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ],
    defaultPrefix: '!',
    allowedMentions: {users: []}
})

client.login(process.env.TOKEN)