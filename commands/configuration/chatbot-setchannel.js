module.exports = {
    name: "chatbot-setchannel",
    description: "Set the chatbot channel.",
    aliases: ["chatbotch", "chch", "chatch", "chbot"],
    run: async(client, message, args) => {
        const schema = require("../../models/chatbot-channel")

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("You do not have permissions to use this command!")

        const channel = message.mentions.channels.first() || message.channel
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (data) data.delete()
            new schema({
                Guild: message.guild.id,
                Channel: channel.id
            }).save()
            message.channel.send(`<#${channel.id}> has been configured to your chatbot channel!`)
        })
    }
}