import { type EventData } from '..'

export default {
    run: ({}, interaction, err) => {
        if (err instanceof Error)
            interaction.reply({
                embeds: [{
                    title: err.name,
                    description: err.message,
                    color: 'RED'
                }],
                ephemeral: true
            })
        else 
            console.error(err)
    }
} as EventData<'commandError'>