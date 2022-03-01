const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Create a suggetion in an orginized matter.",
    options: [{
            name: "type",
            description: "select the type.",
            required: true,
            type: "STRING",
            choices: [{
                    name: "Command",
                    value: "Command",
                },
                {
                    name: "Event",
                    value: "Event",
                },
                {
                    name: "System",
                    value: "System",
                }
            ]
        },
        {
            name: "name",
            description: "Provide a name for your suggestion",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "Describe the functionality",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {
            options
        } = interaction;
        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${interaction.member} has suggested a ${type}.`)
            .addField("Name", `${name}`, true)
            .addField("Functionality", `${funcs}`, true)
        const message = await interaction.reply({
            embeds: [Response],
            fetchReply: true
        })
        message.react("⛔")
        message.react("✅")
            // message.react("<:banHammer:924599082549391370>")
            // message.react("<:10outof10:924599841714208818>")
    }
}