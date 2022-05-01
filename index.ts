import Discord from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import 'dotenv/config'


const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS'
    ],
    partials: [
        'REACTION'
    ]
})

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`)

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['968171159776559174'],
        botOwners: ['691572882148425809'],
        mongoUri: process.env.MONGO_URI
    })
})

client.login(process.env.TOKEN)