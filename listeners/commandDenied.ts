import type { UserError, CommandDeniedPayload } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';

export class CommandDenied extends Listener {
  public run(error: UserError, { message }: CommandDeniedPayload) {
    if (Reflect.get(Object(error.context), 'silent')) return
    return message.channel.send(error.message);
  }
}