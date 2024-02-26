const { EmbedBuilder } = require("discord.js");
const Item = require("../../Schema/item");
const { error, checkInt, success } = require("../lib/utils");

module.exports = {
  name: "item-info",
  description: "With this command u can your daily reward!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      args = args[0];
      if (args === "slot") {
        return success(message, "pene");
      }

      const usShop = await Item.findOne({ guildId: message.guild.id });

      const usItem = await usExists.items.find((i) => i.name === args);
      const m = await usExists.items.map((x) => `${x.owned ? "Yes" : "No"}`);

      const items = usShop.items.find((i) => i.name === args);
      if (items) {
        const embed = new EmbedBuilder()

          .setAuthor({
            name: message.author.username,
            iconURL: usExists.avatar,
          })
          .setThumbnail(usExists.avatar)
          // .setDescription(`**Name:** \`${items.name}\`\n**Price:** \`${items.price}\`\n**Description:** \`${items.description}`)
          .addFields(
            {
              name: "Name",
              value: `\`${items.name}\``,
              inline: true,
            },
            {
              name: "Emoji",
              value: `\`${items.emoji}\``,
              inline: true,
            },
            {
              name: "Price",
              value: `\`${items.price}\``,
              inline: true,
            },
            {
              name: "Description",
              value: `\`${items.description}\``,
            },
            {
              name: "Users",
              value: `\`${items.users}\``,
              inline: true,
            },
            {
              name: "Owned",
              value: `\`${m}\``,
              inline: true,
            },
            {
              name: "Role",
              value: `<@&${items.itemId}>`,
              inline: true,
            },
            {
              name: "Shoppable",
              value: `\`${items.shoppable ? "Yes" : "No"}\``,
              inline: true,
            }
          )
          .setColor(usExists.color)
          .setTimestamp();

        await message.reply({ embeds: [embed] });
      } else {
        return error(message, "That item is not exist!");
      }
    } catch (e) {
      return error(message, e.message);
    }
  },
};
