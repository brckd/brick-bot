import type { UserError } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import { Client } from 'discord.js';

export class Ready extends Listener {
  public run(client: Client) {
      console.log(`Logged in as ${client.user?.tag}`)
  }
}