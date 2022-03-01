const {
    GuildMember,
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: "guildMemberUpdate",
    /**
     * 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     */
    async execute(oldMember, newMember) {
        const {
            guild
        } = newMember;

        const Thankyou = new MessageEmbed()
            .setColor('BLURPLE')
            .setAuthor("Server Boosted", guild.iconURL({
                dynamic: true,
                size: 512
            }))

        if (!oldMember.premiumSince && newMember.premiumSince) {
            const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");
            const background = await Canvas.loadImage("./Structres/Images/boosted.png");
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "#9B59B6";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.font = "38px cursive";
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(newMember.displayName, canvas.width / 2, cavas.height / 1.2);

            const avatar = await Canvas.loadImage(newMember.user.displayAvatarUrl({
                format: "png"
            }));

            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);

            const attachment = new MessageAttachment(canvas.toBuffer(), "booster.png");

            Thankyou.setDescription(`Thank you for boosting the sever!`)
            Thankyou.setImage('attachment://booster.png');
            Thankyou.addField(`Message From Us`, "Your support is highly appriciated and we hope you can continue to support our server and growth as a community.")

            await guild.systemChannel.send({
                embed: [Thankyou],
                files: [attachment]
            }).catch((err) => console.log(err));

            Thankyou.setDescription(`Thank you for boosting the sever! `)
            Thankyou.addField(`Message From Us`, "Your support is highly appriciated and we hope you can continue to support our server and growth as a community.")
            newMember.send({
                embeds: [Thankyou]
            })
        }





    }
}