// Only edit line 10 of this file which requires your server id. 

const {
    Perms
} = require("../Validation/Permisions");
const {
    Client
} = require("discord.js");

const guildID = "756063214609104986";
// const guildId = "705445943570464839";
/**
 * @param {Client} client
 */
module.exports = async(client, PG, Ascii) => {
    const Table = new Ascii('Commands Loaded')
    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/**/*.js`)).map(async(file) => {
        const command = require(file);
        if (!command.name)
            return Table.addRow(file.split("/")[7], "⛔ FAILD ", " Missing a name.");
        // if (!command.type)
        //     return Table.addRow(command.name, "🔸 FAILED", "missing a description.");
        if (!command.context && !command.description)
            return Table.addRow(command.name, "🔸 FAILED", "missing a description.");
        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "⛔ FAILD", " Permission is invalid")
        }
        client.commands.set(command.name, command)
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL")
    });
    console.log(Table.toString());

    // Permission Check //

    client.on("ready", async() => {

        const MainGuild = await client.guilds.cache.get(guildID);
        MainGuild.commands.set(CommandsArray).then(async(command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;
                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms) && !r.managed).first(10);
            }


            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {
                        id: r.id,
                        type: "ROLE",
                        permission: true
                    }]
                }, [])
                return [...accumulator, {
                    id: r.id,
                    permissions
                }]
            }, [])
            await MainGuild.commands.permissions.set({
                fullPermissions
            })
        })
    })
}