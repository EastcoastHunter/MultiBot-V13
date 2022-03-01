const {
    Client
} = require("discord.js");
const mongoose = require("mongoose");

const Database = process.env.database;
// const Database = "";
module.exports = {
    name: "ready",
    once: true,
    execute(client) {

        console.log("The bot is now online");
        client.user.setStatus("online")
        client.user.setActivity("over " + client.guilds.cache.size + " servers", {
            type: "WATCHING",
        })


        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database")
        }).catch((err) => {
            console.log(err)
        })
    }
}