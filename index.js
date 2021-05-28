const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const {prefix} = require("./config.json")
const token = require("./config.json")

const client = new Client({
    disableEveryone: true
})

module.exports = client

// Collections
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setActivity("e!help | MUSIC BOT",{type: "WATCHING"}) 
})

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (message.channel.type === 'dm') {
        message.author.send("Hi there, I do not respond to commands here. You'll have to use me in a server. This is an automated message!")
    }
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});


client.login(token.token);
