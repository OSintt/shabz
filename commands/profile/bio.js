const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "bio-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {
    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste poner tu biografia!"
        : "You forgot to put ur new bio!";

    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\n/gi, " ").trim();
    if (!args) return error(message, msg);
    if (args.length > 20) {
      args = args.slice(0, 19) + "...";
    }

    const marry = await User.findOne({ userId: usExists.marry });
    usExists.bio = args;
    const profile = new EmbedBuilder()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(usExists.avatar)
      .setFields(
        {
          name: `${usExists.emoji} Nick`,
          value: `\`${usExists.nick}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Rep`,
          value: `\`${usExists.rep}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Coins`,
          value: `\`${usExists.cash + usExists.bank}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Xp`,
          value: `\`${usExists.xp}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Items`,
          value: `\`${usExists.items}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Hugs`,
          value: `\`${usExists.hugs}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Pats`,
          value: `\`${usExists.pats}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Language`,
          value: `\`${usExists.Language}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Married`,
          value: `\`${marry ? marry.nick : "Single!"}\``,
          inline: true,
        },
        {
          name: `Biografia`,
          value: `\`\`\`${usExists.bio}\`\`\``,
        }
      );
    await usExists.save();
    return message.channel.send({
      embeds: [profile],
    });
  },
};
