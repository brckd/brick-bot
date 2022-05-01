import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages at once',
    slash: 'both',
    testOnly: true,

    minArgs: 1,
    expectedArgs: '<amount>',

    permissions: ['MANAGE_MESSAGES'],

    callback: async ({ message, interaction, channel, args}) => {
        const amount = args.length = parseFloat(args.shift()!)

        if (message)
            await message.delete()
        
        const { size } = await channel.bulkDelete(amount, true)

        const reply = `${size} message${size==1 ? '':'s'} deleted`
        if (message)
            channel.send(reply).then(m => {
                setTimeout(() => m.delete(), 1000 * 3);
              })
        if (interaction)
            interaction.reply({
                content: reply,
                ephemeral: true
            })
    }
} as ICommand