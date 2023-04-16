const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");

module.exports = {
  name: "profile",
  description: "With command can see u profile",
  run: async (client, message, args,) => {
    const user = message.mentions.users.first() || message.author;
    const data = await User.findOne({ userId: user.id });
    if (!data) return error(message, "Try 6register first!");
    await message.channel.send({
      embeds: [await getProfile(message, data.userId, user)],
    });
  },
};