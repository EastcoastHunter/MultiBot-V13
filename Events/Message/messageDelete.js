const {
    Message,
    MessageEmbed,
    WebhookClient,
    Client
} = require("discord.js");


module.exports = {
    name: "messageDelete",
    /**
     * @param {Client} client
     * @param {Message} message 
     */
    execute(message, client) {
        if (message.author.bot) return;
        const Log = new MessageEmbed()
            .setColor("DARK_RED")
            .setTitle("Message has been logged in **" + message.guild.name + "(" + message.guild.nameAcronym + ")**")
            .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**\nin ${message.channel}.`)
            .setTimestamp(new Date())
            .setFooter(message.author.tag + " • Logged by : " + client.user.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField("Deleted Message:", `>>> ${message.content? message.content : "None"}`.slice(0, 4096))

        if (message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, false)
        }
        new WebhookClient({
            url: "https://discord.com/api/webhooks/924737290943733820/kRHAndjMX3v1tvGZt6_sMgcs4zktjS0VCXRoBoQ1UtZk4OhMu1q52nbDPrlUXD76ojVe",
        }).send({
            embeds: [Log],
            avatarURL: client.user.displayAvatarURL()
        }).catch((err) => console.log(err));
    }
}