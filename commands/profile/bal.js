const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "bal",
  description: "You can see your bal",
  cooldown: 3000,
  run: async (client, message, usExists, args) => {
    try {
    const usMention = message.mentions.users.first() || message.author;
    const data = await User.findOne({ userId: usMention.id });
    if (!data) return error(message, "Try 6register first!");
    const embed = new EmbedBuilder()
      .setAuthor({
        name: usMention.tag,
        iconUrl: usMention.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(data.avatar)
      .setDescription(
        `**${usMention.username}**'s current bal is: \`${
          data.cash + data.bank
        }\``
      )
      .setFields(
        {
          name: `${data.emoji} Cash`,
          value: `\`${data.cash}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Bank`,
          value: `\`${data.bank}\``,
          inline: true,
        },
        {
          name: `${data.emoji} All money`,
          value: `\`${data.cash + data.bank}\``,
          inline: true,
        }
      );
    return message.reply({
      embeds: [embed],
    })
  } catch(e) {
    return error(message, e.message)
  }
  },
};
