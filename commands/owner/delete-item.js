const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Server = require("../../Schema/server");
module.exports = {
  name: "delete-item",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const itName = args[0]
    if(!itName) return error(message, 'You forgot the name from item!')

    const data = await Server.findOne({ guildId: message.guild.id })

    const shop = {
        itemName: itName,
    }

    data.items.findOneAndDelete(shop)

    message.reply({ embeds: [
        new EmbedBuilder()
        .setTitle('New item created!')
        .setDescription(`**Name:** \`${itName}\`\n**Emoji:** \`${itEmoji}\`\n**Price:** \`${itPrice}\`\n**Description:** \`${itDescription}\``)
    ]})
  },
};
