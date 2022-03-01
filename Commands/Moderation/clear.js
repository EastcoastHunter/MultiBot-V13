const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: "purge",
    description: "Clears the channel or a specified user",
    permission: "MANAGE_MESSAGES",
    options: [{
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a target(user)",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a target(user) to clear their messages",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const {
            channel,
            options
        } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}`);
                interaction.reply({
                    embeds: [Response]
                });
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from chat`);
                interaction.reply({
                    embeds: [Response],
                    ephemeral: true
                });
            })
        }
    }
}