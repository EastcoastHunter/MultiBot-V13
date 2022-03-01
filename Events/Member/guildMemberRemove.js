const {
    MessageEmbed,
    WebhookClient,
    GuildMember,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: 'guildMemberRemove',
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const {
            user,
            guild
        } = member;
        member.roles.add("923800425612869712");

        // https://discord.com/api/webhooks/923800724360536086/0A4GLMfbezX0KCQY8YbcZ-SqKaweXXuKAd3SIjknJph6dKU92UFP9viBh71DdOHy-OMB
        const Welcomer = new WebhookClient({
            id: "923800724360536086",
            token: "0A4GLMfbezX0KCQY8YbcZ-SqKaweXXuKAd3SIjknJph6dKU92UFP9viBh71DdOHy-OMB"
        })
        const Welcome = new MessageEmbed()
            .setColor("DARK_ORANGE")
            .setAuthor(user.tag, user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .setThumbnail(user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .setDescription(`
        ${member} has left the community!\n
        Joined: ***<t:${parseInt(member.joinedTimestamp / 1000)}:R>***\nLatest Member Count: **${guild.memberCount}**`)
            .setFooter(`${user.tag}`, guild.iconURL({
                dynamic: true
            }))
            .setTimestamp(new Date())

        Welcomer.send({
            // ephemeral: true,
            embeds: [Welcome]
                // components: [row]
        })

    }
}