const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils");
module.exports = {
  name: "set",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    if (message.author.id !== hershell) return;
    try {
      dato = args[0];
      const options = ["nick", "avatar", "emoji", "bio", "color", "prefix"];
      if (!data)
        return error(
          message,
          "__**Usage:**__:\n`6set <nick | avatar | emoji | bio | color | prefix>`"
        );
      if (message)
      usExists[dato] = args.slice(1);
      await usExists.save();

      message.reply({ content: usExists.nick });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
