const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile, success, hershell } = require("../lib/utils");
module.exports = {
  name: "bio-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
      if (message.author.id !== hershell) return;
      args = args.join(" ").replace(/`/gi, "");
      args = args.replace(/\n/gi, " ").trim();
      if (!args) return error(message, "You forgot to put ur new bio!");
      if (args.length > 20) {
        args = args.slice(0, 19) + "...";
      }
      usExists.bio = args;
      await usExists.save();
      return success({
        embeds: [await getProfile(message, usExists.userId, guild)],
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
