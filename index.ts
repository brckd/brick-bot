import Discord, { Client, Intents } from 'discord.js'
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
    const guildId = '968171159776559174'
    const guild = client.guilds.cache.get(guildId)
    let commands = guild ? guild.commands : client.application?.commands!

    commands.create({
        name: 'ping',
        description: 'Replies with 🏓 *Pong!*'
    })

    commands.create({
        name: 'say',
        description: 'Let the bot say something',
        options: [
            {
                name: 'text',
                description: 'The text to say',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith('ping'))
        message.reply('🏓 *Pong!*')
})

client.on('interactionCreate', (inter) => {
    if (!inter.isCommand()) return

    const {commandName, options} = inter

    switch (commandName) {
        case 'ping':
            inter.reply({
                content: '🏓 *Pong!*',
                ephemeral: true
            })
            break
        case 'say':
            const text = options.getString('text')!
            inter.reply({
                content: text
            })
            break   
    }

})

client.login(process.env.TOKEN)