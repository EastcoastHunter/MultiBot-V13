const {
    CommandInteraction
} = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping",
    permission: "SEND_MESSAGES",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        interaction.reply({
            content: "PING howdy there I am MultiBot and I love to play ping pong How about you?"
        })
    }
}