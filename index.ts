import Discord, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith('ping'))
        message.reply('🏓 *Pong!*')
})

client.login(process.env.TOKEN)