import { EventTemplate } from "../handlers";

export default {
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}`)
    }
} as EventTemplate