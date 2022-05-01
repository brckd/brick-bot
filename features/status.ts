import { Client, TextChannel } from "discord.js"

let statusOptions = [
    'hello',
    'world',
    'test'
] as string[]

export default (client: Client) => {
    let counter = 0;

    const updateStatus = () => {
        client.user?.setPresence({
            activities: [{
                name: statusOptions[counter++%statusOptions.length]
            }]
        })
        setTimeout(updateStatus, 1000 * 60 * 3)
    }
    updateStatus()
}

export const config = {
    displayName: 'Status Changer',
    dbName: 'STATUS_CHANGER'
}