import Discord, { StringMappedInteractionTypes } from 'discord.js'
import 'dotenv/config'
import { Client } from './handlers'

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ],
    prefix: '!',
    owners: ['691572882148425809'],
    allowedMentions: {users: [], roles: [], repliedUser: false}
})

client.login(process.env.TOKEN)