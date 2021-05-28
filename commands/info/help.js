const discord = require("discord.js");

module.exports = {
  name: "help",
  run: async (client, message, args) => {
    const embed = new discord.MessageEmbed()

      .setTitle(`${client.user.username} HELP MENU`)

      .setThumbnail(
        message.author.displayAvatarURL({ dynamic: true, size: 1024 })
      )

      .setDescription(
        `

**MUSIC COMMANDS**
\`play[p],search,pause,resume,stop,skip,skipall,skipto,nowplaying[np],queue,loop,remove,volume\`


**INFO COMMANDS**
\`ping,help\`
`
      )
      .setFooter(`Created by tutukuku#1340 ● message.guild`);
    message.channel.send(embed);
  }
};
