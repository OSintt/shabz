const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Item = require("../../Schema/item");
module.exports = {
  name: "add-item",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {
    if (message.author.id !== hershell) return;

    const itName = args[0];
    if (!itName) return error(message, "You forgot the name from item!");

    const itEmoji = args[1];
    if (!itEmoji) return error(message, "You forgot the emoji from item!");

    const itRol = args[2];
    if (!itRol) return error(message, "You forgot the rol from item!");

    const itPrice = args[3];
    if (!itPrice) return error(message, "You forgot the price from item!");

    const itDescription = args.slice(4).join(" ");
    if (!itDescription)
      return error(message, "You forgot to description from item!");

    const data = await Item.findOne({ guildId: message.guild.id });

    if(data) {
      data.items.push({
        name: itName,
        emoji: itEmoji,
        itemId: itRol,
        price: itPrice,
        description: itDescription,
        shoppable: true,
      });
    }

    await data.save();

    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("New item created!")
          .setDescription(
            `**Name:** \`${itName}\`\n**Emoji:** \`${itEmoji}\`\n**Price:** \`${itPrice}\`\n**Description:** \`${itDescription}\``
          ),
      ],
    });
  },
};
  