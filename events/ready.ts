import { IEvent } from "../handlers"

export default {
    run: async (client) => {
        console.log(`Logged in as ${client.user?.tag}`)
    }
} as IEvent