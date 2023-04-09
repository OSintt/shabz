const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "bal",
  decription: "You can see your bal",
  run: async (client, message, interaction, args) => {
    const user = message.mentions.members.first() || message.author;
    const data = await User.findOne({ userId: user.id });
    if (!data) return error(message, "Try 6register first!");
    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconUrl: user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(data.avatar)
      .setDescription(
        `**${user.username}**'re current bal is: \`${data.cash + data.bank}\``
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

    await message.channel.send({
      embeds: [embed],
    });
  },
};
