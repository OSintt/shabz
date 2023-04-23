const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "color-set",
  description: "You forgot to put ur color!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    args = args[0];
    if (!args) return error(message, "You forgot to put your new color!");
    if (!args.match(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i))
      return error(message, "That's an invalid HEX color!");
    usExists.color = parseInt(args.replace("#", ""), 16);
    await usExists.save();

    message.channel.send({
      embeds: [await getProfile(message, usExists.userId, guild)],
    });
  },
};
