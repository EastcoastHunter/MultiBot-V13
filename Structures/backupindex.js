const {
    Client,
    Collection
} = require('discord.js');

require('dotenv').config();
const client = new Client({
    intents: 581
});
const {
    promisify
} = require("util");
const {
    glob
} = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
client.commands = new Collection();

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii)
})
client.login(process.env.token)