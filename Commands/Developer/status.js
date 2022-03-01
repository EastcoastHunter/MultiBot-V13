const {
    Client,
    MessageEmbed,
    CommandInteraction
} = require("discord.js");
const {
    connection
} = require("mongoose");
require("../../Events/Clients/ready");
module.exports = {
    name: "status",
    description: "Displays the status of the client and database connection",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
            .setTitle(client.user.username + " Connection Information/Status")
            .setColor("DARK_NAVY")
            .setThumbnail(client.user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .setDescription(`**Client**: \`🟢 ONLINE \` - \`${client.ws.ping}ms\`\n**Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n**Database**: \`${switchTo(connection.readyState)}\``)
        interaction.reply({
            ephemeral: true,
            embeds: [Response]
        })
    }
}

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `🔴 DISCONNECTED`
            break;
        case 1:
            status = `🟢 CONNECTED`
            break;
        case 2:
            status = `🟠 CONNECTING`
            break;
        case 3:
            status = `⚫ DISCONNECTING`
            break;
    }
    return status;
}