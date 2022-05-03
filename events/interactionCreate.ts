import { Interaction, Permissions } from "discord.js";
import { IEvent } from "../handlers";

export default {
    run: (client, interaction: Interaction) => {
        if (!interaction.isCommand()) return
        
        const slash = client.slashcommands.get(interaction.commandName)

        if (!slash) return interaction.reply('Slash command not found')

        let missing = interaction.member ? interaction.memberPermissions?.missing(slash.permissions||[])! : new Permissions(slash.permissions||[]).toArray()
        if (missing.length > 0)
            return interaction.reply({
                content: `Missing permissions to run this command:\n>>> ${missing.join('\n')}`,
                ephemeral: true
            })
        
        try {
            slash.run({client, interaction})
        }
        catch (err) {
            if (err instanceof Error && err.toString().startsWith('?'))
                interaction.reply({
                    content: err.toString(),
                    ephemeral: true
                })
            else 
                console.error(err)
        }
    }
} as IEvent