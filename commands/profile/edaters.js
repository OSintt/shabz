const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
const dayjs = require("dayjs");
module.exports = {
  name: "edaters",
  description: "You can see your bal",
  cooldown: 3000,
  run: async (client, message, usExists, args) => {
    try {
      const user = message.mentions.users.first() || message.author;
      const data = await User.findOne({ userId: user.id });
      if (!data) return error(message, "Try 6register first!");
      const edater =
        data.married
          .map(
            (m) =>
              `\`${data.married.length}\` ${m.nick} (<@${
                m.userId
              }>)\n* Edater since: \`${dayjs(m.date).format(
                "dddd/MMMM/YYYY at HH:mma"
              )}\``
          )
          .join("\n") || "Nope";
      const embed = new EmbedBuilder()
        .setTitle("Your Edaters!")
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(data.avatar)
        .setDescription(`${edater}`)
        .setColor(data.color)
        .setTimestamp();
      return message.reply({
        embeds: [embed],
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
