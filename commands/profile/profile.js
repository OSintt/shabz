const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "profile",
  decription: "With command can see u profile",
  cooldown: 3000,
  run: async (client, message, interaction, args) => {
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
          name: `${data.emoji} Married`,
          value: `\`${marry ? marry.nick : "Single!"}\``,
          inline: true,
        },
        {
          name: `Biografia`,
          value: `\`\`\`${data.bio}\`\`\``,
          inline: true,
        }
      );

    await message.channel.send({
      embeds: [profile],
    });
  },
};
