import { EventData } from '../brickord'

export default {
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}!`)
        client.startTime = Math.round(Date.now() / 1000)
    }
} as EventData<'ready'>

declare module 'discord.js' {
    interface Client {
        startTime: number
    }
}