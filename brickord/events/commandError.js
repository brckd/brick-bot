"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    run: ({}, interaction, err) => {
        if (err instanceof Error)
            interaction.reply({
                content: err.toString(),
                ephemeral: true
            });
        else
            console.error(err);
    }
};
