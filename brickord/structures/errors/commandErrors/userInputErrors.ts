import { CommandError } from '.'
import { inlineCode } from '@discordjs/builders'

export class UserInputError extends CommandError {
    name = 'User Input Error'
}

export class MissingRequiredArgument extends UserInputError {
    name = 'Missing Required Argument'
    constructor(param: string) {
        super(`Missing required argument: ${inlineCode(param)}`)
    }
}

export class TooManyArguments extends UserInputError {
    name = 'Too Many Arguments'
    constructor(required: number, given: number) {
        super(`Command has **${required}** parameters, but **${given}** were given`)
    }
}



export class BadArgument extends UserInputError {
    name = 'Bad Argument'
}

export class AttachmentNotFound extends BadArgument {
    name = 'Attachment Not Found'
    constructor() {
        super(`Command expected an attachement, but none was found`)
    }
}

export class BadBoolArgument extends BadArgument {
    name = 'Bad Boolean Argument'
    constructor(input: string) {
        super(`Couldn't convert ${inlineCode(input)} to boolean`)
    }
}

export class ChannelNotFound extends BadArgument {
    name = 'Channel Not Found'
    constructor(input: string) {
        super(`Couldn't find channel ${inlineCode(input)}`)
    }
}

export class BadIntArgument extends BadArgument {
    name = 'Bad Integer Argument'
    constructor(input: string) {
        super(`Couldn't convert ${inlineCode(input)} to integer`)
    }
}

export class MemberNotFound extends BadArgument {
    name = 'Member Not Found'
    constructor(input: string) {
        super(`Couldn't find member ${inlineCode(input)}`)
    }
}

export class MentionableNotFound extends BadArgument {
    name = 'Mentionable Not Found'
    constructor(input: string) {
        super(`Couldn't find mentionable ${inlineCode(input)}`)
    }
}

export class BadNumArgument extends BadArgument {
    name = 'Bad Number Argument'
    constructor(input: string) {
        super(`Couldn't convert ${inlineCode(input)} to number`)
    }
}

export class RoleNotFound extends BadArgument {
    name = 'Role Not Found'
    constructor(input: string) {
        super(`Couldn't find role ${inlineCode(input)}`)
    }
}

export class SubcommandNotFound extends BadArgument {
    name = 'Role Not Found'
    constructor(input: string) {
        super(`Couldn't find subcommand ${inlineCode(input)}`)
    }
}

export class SubcommandGroupNotFound extends BadArgument {
    name = 'Role Not Found'
    constructor(input: string) {
        super(`Couldn't find subcommand groupü ${inlineCode(input)}`)
    }
}