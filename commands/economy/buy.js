const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Item = require("../../Schema/item");
const { error, us, success, hershell } = require("../lib/utils");

module.exports = {
  name: "buy",
  description: "With this command u can robbed others users!",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {
    try {
      const usShop = await Item.findOne({ guildId: message.guild.id });
      if (!usShop) return error(message, "That guild no have a shop!");

      args = args[0];
      if (!args) return error(message, "You forgot to mention an item!");

      if (args === "slots") {
        usExists.slotsMax += 1;
        await usExists.save();
        console.log(usExists.slotsMax);
        return success(message, "pene");
      }

      const usItem = usExists.items.find((i) => i.name === args);
      if (usItem) return error(message, "You already have item!");

      const items = usShop.items.find((i) => i.name === args);
      if (items) {
        usExists.items.push({
          name: items.name,
          itemId: items.itemId,
          price: items.price,
          description: items.description,
          emoji: items.emoji,
          owned: true,
        });
        items.users += 1;
        await usExists.save();
        await usShop.save();
        console.log(items.users);

        const embed = new EmbedBuilder()

          .setTitle("You've just bought an item!")
          .setThumbnail(usExists.avatar)
          .setDescription(
            `**Name:** \`${items.name}\`\n**Price:** \`${items.price}\`\n**Description:** \`${items.description}`
          )
          .setColor(usExists.color)
          .setTimestamp()
          .setFooter({
            text: `${usExists.nick}`,
            iconURL: `${usExists.avatar}`,
          });

        await message.reply({ embeds: [embed] });
      } else {
        return error(message, "That item is not exist!");
      }

      if (usExists.cash < items.price)
        return error(message, "You need to more money to buy this item!");
    } catch (e) {
      return error(message, e.message);
    }
  },
};
