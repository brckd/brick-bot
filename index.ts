import Discord, { StringMappedInteractionTypes } from 'discord.js'
import 'dotenv/config'
import { Client } from './framework'

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ],
    prefix: '!',
    owners: ['691572882148425809'],
})

client.login(process.env.TOKEN)