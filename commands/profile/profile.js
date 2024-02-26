const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");

module.exports = {
  name: "profile",
  description: "With command can see u profile",
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
      let user =
        message.mentions.users.first() ||
        client.users.cache.find((u) => u.username === args[0]) ||
        message.author;
      if (!user) return error(message, "This user is not exist!");
      const data = await User.findOne({ userId: user.id });
      if (!data) return error(message, "Try 6register first!");

      const search = data.blockeds.find((b) => b.userId === usExists.userId);
      if (search) return error(message, "Nope");

      await message.reply({
        embeds: [await getProfile(message, data.userId, guild, user)],
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
