import { IEvent } from "../framework"

export default {
    run: async (client) => {
        console.log(`Logged in as ${client.user?.tag}`)
    }
} as IEvent