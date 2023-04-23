const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const dayjs = require("dayjs");

const error = (message, msg) => {
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor("FF0000")],
  });
};
const getProfile = async (message, userId, guild, mention) => {
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
    .setColor(1146986)
    .setDescription(
      `||${user.emoji}|| **Nick:** \`${user.nick}\` **Rep:** \`${
        user.rep
      }\`\n||${user.emoji}|| **Coins:** \`${
        user.cash + user.bank
      }\` **Items:** \`${guild.inventory.length}\`**Xp:** \`${user.xp}\`\n||${
        user.emoji
      }|| **Edater:** ${marry ? marry.nick : "Single!"}\n**Bio:** \`\`\`${
        user.bio
      }\`\`\`
            `
    )
    .setFooter({
      text: `Member since ${dayjs(user.birthday).format("D/M/YY - h:mma")}`,
    });
};
const hershell = "793161028988960798";
module.exports = { hershell, error, getProfile };