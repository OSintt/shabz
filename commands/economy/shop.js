const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Server = require("../../Schema/server");
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "shop",
  decription: "You can see the leaderboard",
  auth: true,
  run: async (client, message, args, usExists) => {

    let data = await Server.findOne({ guildId: message.author.id })
    if(data.items === []) return error(message, "This server doesn't items")

    const shop = data.items.map(c => `${usExists.emoji} **${c.itemName}** | **Price:** __${c.itemPrice}__ coins\n\`${c.itemDescription}\``).join('\n')

    const embed = new EmbedBuilder()

    .setTitle(`${message.guild.name} Store!`)
    .setDescription(`${shop}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};