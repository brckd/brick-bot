"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'interactionCreate',
    run: (client, interaction) => {
        if (!(interaction.isCommand()))
            return;
        const command = client.commands.get(interaction.commandName);
        try {
            if (!command)
                throw new Error(`Command not found: ${name}`);
            let args = [];
            if (command.data.options) {
                const options = interaction.options;
                args = command.data.options.map(option => {
                    switch (option.type) {
                        case 1: return options.getSubcommand(option.required);
                        case 2: return options.getSubcommandGroup(option.required);
                        case 3: return options.getString(option.name, option.required);
                        case 4: return options.getInteger(option.name, option.required);
                        case 5: return options.getBoolean(option.name, option.required);
                        case 6: return options.getUser(option.name, option.required);
                        case 7: return options.getChannel(option.name, option.required);
                        case 8: return options.getRole(option.name, option.required);
                        case 9: return options.getMentionable(option.name, option.required);
                        case 10: return options.getNumber(option.name, option.required);
                        case 11: return options.getAttachment(option.name, option.required);
                    }
                });
            }
            const reply = command.run(interaction, ...args);
        }
        catch (err) {
            if (err instanceof Error)
                client.emit('commandError', interaction, err);
            else
                console.error(err);
        }
    }
};
