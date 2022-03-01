const {
    MessageEmbed,
    Message,
    WebhookClient,
    Client
} = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     * @param {Client} client 
     * @returns 
     */
    execute(oldMessage, newMessage, client) {
        if (oldMessage.author.bot) return;
        if (oldMessage.content === newMessage.content) return;

        const Count = 1950;
        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "");
        const Log = new MessageEmbed()
            .setColor("GREYPLE")
            .setTitle("Message has been edited in **" + newMessage.guild.name + "(" + newMessage.guild.nameAcronym + ")**")
            .setTimestamp(new Date())
            .setDescription(`📃 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n\n\n`)
            .setThumbnail(newMessage.author.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .setImage(newMessage.guild.bannerURL({
                dynamic: true
            }))
            .setFooter(`Member: ${newMessage.author.tag}` + " • Logged by : " + client.user.tag, newMessage.guild.iconURL({
                dynamic: true
            }))

        .addField("Origninal Message:", ">>> " + Original, true)
            .addField("Edited To", ">>> " + Edited, false);
        new WebhookClient({
            url: "https://discord.com/api/webhooks/924737290943733820/kRHAndjMX3v1tvGZt6_sMgcs4zktjS0VCXRoBoQ1UtZk4OhMu1q52nbDPrlUXD76ojVe"
        }).send({
            embeds: [Log],
            avatarURL: client.user.displayAvatarURL()
        }).catch((err) => console.log(err));
    }
}