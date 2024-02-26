const { EmbedBuilder, Embed } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "inventory",
  description: "You forgot to put ur color!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
      const user = message.mentions.members.first() || message.author;
      const us = await User.findOne({ userId: user.id });
      const items =
        us.items.map((i) => `${usExists.emoji} • ${i.name}`).join("\n") ||
        "Nope";

      const embed = new EmbedBuilder()

        .setAuthor({
          name: us.nick,
          iconURL: us.avatar,
        })
        .setDescription(`Try \`6use\` to use an item!\n\n${items}`);

      await message.reply({ embeds: [embed] });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
