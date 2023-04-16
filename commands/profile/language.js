const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "language-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists, guild) => {
    const language = args[0];
    if (!language || (language !== "Spanish" && language !== "English"))
      return error(
        message,
        "You forgot to select you language [English/Spanish]!"
      );
    await message.channel.send({
      embeds: [await getProfile(message, usExists.userId, guild)],
    });
  },
};
