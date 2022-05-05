import { EventTemplate } from "../handlers";

export default {
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}`)
        client.prefix.push(client.user!.toString())
    }
} as EventTemplate