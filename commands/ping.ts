import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with 🏓 *Pong!*',
    slash: "both",
    testOnly: true,

    callback: ({ message:msg, interaction:inter }) => {
        return '🏓 *Pong!*'
    }
} as ICommand