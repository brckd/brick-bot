import { EventData } from '../brickord'

export default {
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}!`)
    }
} as EventData<'ready'>