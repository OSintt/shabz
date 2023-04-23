const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile} = require("../lib/utils");
module.exports = {
  name: "prefix-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists, guild) => {
    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\*/gi, "");
    args = args.replace(/\n/gi, " ");
    if (!args) return error(message, "You forgot to put ur new prefix!");
    if (args.length > 4) return error(message, "Your prefix can't have 4 letters")
    usExists.prefix = args;
    await usExists.save();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Your current prefix is ${usExists.prefix}`)
      ],
    });
  },
};