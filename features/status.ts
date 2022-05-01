import { Client, TextChannel } from "discord.js"

const statusOptions = {} as [string]

export default (client: Client) => {
    let statusOptions = [
        'hello',
        'world',
        'test'
    ]
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