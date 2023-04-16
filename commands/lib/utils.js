const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");

const error = (message, msg) => {
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor("FF0000")],
  });
};
const getProfile = async (message, userId, mention) => {
  const user = await User.findOne({ userId });
  const marry = await User.findOne({ userId: user.marry });
  if (!mention) {
    mention = message.author;
  }
  return new EmbedBuilder()
    .setAuthor({
      name: mention.tag,
      iconURL: mention.displayAvatarURL({ dynamic: true }),
    })
    .setThumbnail(mention.displayAvatarURL({ dynamic: true }))
    .setColor("#00ff00")
    .setFields(
      {
        name: `${user.emoji} Name`,
        value: `\`${user.nick}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Rep`,
        value: `\`${user.rep}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Coins`,
        value: `\`${user.cash + user.bank}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Items`,
        value: `\`${user.items}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Xp`,
        value: `\`${user.xp}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Hugs`,
        value: `\`${user.hugs}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Pats`,
        value: `\`${user.pats}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Language`,
        value: `\`${user.Language}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Married`,
        value: `\`${marry ? marry.nick : "Single!"}\``,
        inline: true,
      },
      {
        name: `${user.emoji} Bio`,
        value: `\`\`\`${user.bio}\`\`\``,
      }
    )
    .setTimestamp();
};
const hershell = "793161028988960798";
module.exports = { hershell, error, getProfile };
