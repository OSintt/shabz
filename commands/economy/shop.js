const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Server = require("../../Schema/server");
const Item = require("../../Schema/item")
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "shop",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {

    let data = await Item.find()
    
    const shop = data.map(c => `${usExists.emoji} **${c.itemName}** | **Price:** __${c.itemPrice}__ coins\n\`${c.itemDescription}\``).join('\n\n') || "This server doesn't have items!"
    const embed = new EmbedBuilder()

    .setAuthor({
      name: message.guild.name + " Store!",
      iconURL: message.guild.iconURL({ dynamic: true })
    })
    .setTitle('Use `6buy`!')
    .setDescription(`${usExists.emoji} **Hen** | **Price:** __2000__ coins!\n\`With this item can you bet!\`\n\n ${usExists.emoji} **6changePija** | **Price:** __5000__ coins! \n\`With this item can change your pija's length!\``)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setColor(usExists.color)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};