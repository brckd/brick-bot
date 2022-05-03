import { ICommand } from "../../handlers"

export default {
    run: ({ message }, ...text) => {
        message.reply(text.join(' ').replace(/[rl]/g, 'w').replace('s', 'z'))
    }
} as ICommand