const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
const { trusted } = require("mongoose");
module.exports = {
  name: "profile",
  description: "With command can see u profile",
  run: async (client, message, args, usExists) => {
    const user = message.mentions.users.first() || message.author
    const data = await User.findOne({ userId: user.id });
    if (!data) return error(message, "Try 6register first!");

    const marry = await User.findOne({ userId: data.marry });
    const profile = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconUrl: user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(data.avatar)
      .setFields(
        {
          name: `${data.emoji} Nick`,
          value: `\`${data.nick}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Rep`,
          value: `\`${data.rep}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Coins`,
          value: `\`${data.cash + data.bank}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Xp`,
          value: `\`${data.xp}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Items`,
          value: `\`${data.items}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Hugs`,
          value: `\`${data.hugs}\``,
          inline: true
        },
        {
          name: `${data.emoji} Pats`,
          value: `\`${data.pats}\``,
          inline: true
        },
        {
          name: `${data.emoji} Language`,
          value: `\`${data.Language}\``,
          inline: true
        },
        {
          name: `${data.emoji} Married`,
          value: `\`${marry ? marry.nick : "Single!"}\``,
          inline: true,
        },
        {
          name: `Biografia`,
          value: `\`\`\`${data.bio}\`\`\``,
        }
      );

    await message.channel.send({
      embeds: [profile],
    });
  },
};