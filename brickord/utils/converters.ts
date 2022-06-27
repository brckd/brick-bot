import { MemberNotFound, ChannelNotFound, RoleNotFound, MentionableNotFound, BadBoolArgument, BadIntArgument, BadNumArgument } from '..'
import Discord from 'discord.js'

export function getInt(query: string) {
    const result = parseInt(query)
    if(isNaN(result)) throw new BadIntArgument(query)
    return result
}

export function getNumber(query: string) {
    const result = parseFloat(query)
    if(isNaN(result)) throw new BadNumArgument(query)
    return result
}

export function getBoolean(query: string) {
    const result = ['true', 'yes'].includes(query.toLowerCase())
        ? true
        : ['false', 'no'].includes(query.toLowerCase())
        ? false
        : undefined
    if (!result) throw new BadBoolArgument(query)
    return result
}

export async function getMember(message: Discord.Message, query: string) {
    const result =  message.guild?.members.cache.get(query.replace( /\D+/g, ''))
        ?? (await message.guild?.members.search({ query: query, limit: 1 }))?.first()
    if (!result) throw new MemberNotFound(query)
    return result
}

export function getChannel(message: Discord.Message, query: string) {
    const result = message.guild?.channels.cache.get(query.replace( /\D+/g, ''))
        ?? message.guild?.channels.cache.find(c => c.name === query.replace( /[^A-Za-z0-9-]+/g, '').toLowerCase())
    if (!result) throw new ChannelNotFound(query)
    return result
}

export function getRole(message: Discord.Message, query: string) {
    const result = message.guild?.roles.cache.get(query.replace( /\D+/g, ''))
        ?? message.guild?.roles.cache.find(r => r.name.toLowerCase() === query.replace( /[^A-Za-z0-9]+/g, '').toLowerCase())
    if (!result) throw new RoleNotFound(query)
    return result
}

export function getMentionable(message: Discord.Message, query: string) {
    try {
        return getMember(message, query) ?? getRole(message, query)
    }
    catch {
        throw new MentionableNotFound(query)
    }
}