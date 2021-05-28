const { chatBot } = require("reconlx")
const client = require("../../index")
const schema = require("../../models/chatbot-channel")

client.on("message", async(message) => {
    if (!message.guild || message.author.bot) return
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if (!data) return
        if (message.channel.id !== data.Channel) return
        chatBot(message, message.content, message.author.id)
    })
})