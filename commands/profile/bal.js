const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "bal",
  description: "You can see your bal",
  run: async (client, message, args) => {
    const usMention = message.mentions.users.first() || message.author;
    const data = await User.findOne({ userId: usMention.id })
    if (!data) return error(message, "Try 6register first!")
    
    if(data.Language === 'Spanish'){
      const embed = new EmbedBuilder()
      .setAuthor({
        name: usMention.tag,
        iconUrl: usMention.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(data.avatar)
      .setDescription(
        `**${usMention.username}**'s tu bal actual es: \`${data.cash + data.bank}\``
      )
      .setFields(
        {
          name: `${data.emoji} Dinero`,
          value: `\`${data.cash}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Banco`,
          value: `\`${data.bank}\``,
          inline: true,
        },
        {
          name: `${data.emoji} Todo el dinero`,
          value: `\`${data.cash + data.bank}\``,
          inline: true,
        }
      );

    await message.channel.send({
      embeds: [embed],
    });
    } else {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: usMention.tag,
        iconUrl: usMention.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(data.avatar)
      .setDescription(
        `**${usMention.username}**'re current bal is: \`${data.cash + data.bank}\``
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
    }
  },
};