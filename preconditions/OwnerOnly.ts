import { Precondition } from "@sapphire/framework"
import { Message } from "discord.js";

export class OwnerOnly extends Precondition {
    public run(message: Message) {
        return ['691572882148425809'].includes(message.author.id)
            ? this.ok()
            : this.error({ message: 'Only bot owners can use this command' })
    }
}