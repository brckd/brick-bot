import { type EventData } from '..'

export default {
    run: ({}, interaction, err) => {
        if (err instanceof Error)
            interaction.reply({
                content: err.toString(),
                ephemeral: true
            })
        else 
            console.error(err)
    }
} as EventData<'commandError'>