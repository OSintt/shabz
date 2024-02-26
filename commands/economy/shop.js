const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Server = require("../../Schema/server");
const Item = require("../../Schema/item");
const { hershell, error } = require("../lib/utils");
module.exports = {
  name: "shop",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {
    let data = await Item.findOne({ guildId: message.guild.id });

    const shop = data.items
      .map(
        (c) =>
          `${usExists.emoji} **${c.name}** | **Price:** __${c.price}__ coins\n\`${c.description}\``
      )
      .join(`\n— — — <a:shb_a_bat3:1102445318152396820>\n`);

    console.log(data);
    const embed = new EmbedBuilder()

      .setAuthor({
        name: message.guild.name + " Store!",
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTitle("Use `6buy`!")
      .setDescription(
        `${usExists.emoji} **Hen** | **Price:** __2000__ coins!\n\`With this item can you bet!\`\n\n ${usExists.emoji} **6changePija** | **Price:** __5000__ coins! \n\`With this item can change your pija's length!\` \n\n${shop}`
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor(usExists.color)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

    console.log(data.items);
  },
};
