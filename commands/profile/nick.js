const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile, success} = require("../lib/utils");
module.exports = {
  name: "nick-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\*/gi, "");
    args = args.replace(/\n/gi, " ");
    if (!args) return error(message, "You forgot to put ur new nick!");
    if (args.length > 10) {
      args = args.trim().slice(0, 9) + "...";
    }
    usExists.nick = args;
    await usExists.save();
    await message.reply({
      embeds: [await getProfile(message, usExists.userId, guild)],
    })
  } catch(e) {
    return error(message, e.message)
  }
  },
};