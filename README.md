# Brick
Discord.JS Bot for me to finally learn TypeScript

# Brickord
Custom command framework made for [Brick](#Brick) with strict TypeScript typing

## Examples
```
brickord/
commands/
└── info.ts
events/
└── ready.ts
index.ts
```

### Create Client Object [`index.ts`](index.ts)
```ts
import { Client } from './brickord'

const client = new Client({
    intents: [
        ...
    ],
    prefix: '!'
})

client.login(TOKEN)
```

### Create Event [`ready.ts`](events/ready.ts)
```ts
import { EventData } from '../brickord'

export default {
    // name: 'ready',
    run: (client) => {
        console.log(`Logged in as ${client.user?.tag}!`)
    }
} as EventData<'ready'>
```

### Create Command [`info.ts`](commands/info.ts)
```ts
import { SlashCommandBuilder } from '@discordjs/builders'
import { SlashCommandData } from '../brickord'

export const ping = {
    data: new SlashCommandBuilder()
        .setDescription('Sends the bot latency'),
    run: (interaction) => {
        interaction.reply(`> 🏓 *Pong!*\nBot Latency: **${Math.round(interaction.client.ws.ping)}**ms`)
    }
} as SlashCommandData
```
