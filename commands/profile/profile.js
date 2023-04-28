const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");

module.exports = {
  name: "profile",
  description: "With command can see u profile",
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
    const user = message.mentions.users.first() || message.author;
    const data = await User.findOne({ userId: user.id });
    if (!data) return error(message, "Try 6register first!");
    await message.channel.send({
      embeds: [await getProfile(message, data.userId, guild, user)],
    });
    } catch(e) {
      return error(message, e.message)
    }
  },
};