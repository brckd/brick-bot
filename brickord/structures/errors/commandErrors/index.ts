import { inlineCode } from '@discordjs/builders'
import { DiscordExeption } from '..'


export class CommandError extends DiscordExeption {
    name = 'Command Error'
}

export class CommandNotFound extends CommandError {
    name = 'Command Not Found'
    constructor(command: string) {
        super(`Command ${inlineCode(command)} doesn't exist`)
    }
}

export * from './checkFailures'
export * from './userInputErrors'