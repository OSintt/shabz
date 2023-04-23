const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Server = require("../../Schema/server");
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "shop",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    let data = await Server.findOne({ guildId: message.guild.id })
    if(!data) return error(message, 'This server doesnt have shop!')
    if(data.items === []) return error(message, "This server doesn't have items")

    const shop = data.items.map(c => `${usExists.emoji} **${c.itemName}** | **Price:** __${c.itemPrice}__ coins\n\`${c.itemDescription}\``).join('\n\n')

    const embed = new EmbedBuilder()

    .setTitle(`${message.guild.name} Store!`)
    .setDescription(`${usExists.emoji} **6changePija** | **Price** __5000__ coins\n\`Cambia el tamaño de tu pija a otro número aleatorio\`\n\n${shop}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};