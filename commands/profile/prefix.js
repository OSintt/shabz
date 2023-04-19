const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile} = require("../lib/utils");
module.exports = {
  name: "prefix-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists, guild) => {

    if(message.author.id !== hershell) return;

    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste poner tu nuevo prefix!"
        : "You forgot to put ur new prefix!";

    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\*/gi, "");
    args = args.replace(/\n/gi, " ");
    if (!args) return error(message, msg);
    if (args.length > 4) return error(message, "Your prefix can't have 4 letters")
    usExists.prefix = args;
    await usExists.save();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
        .setDescription(`Your current prefixi is ${usExists.prefix}`)
      ],
    });
  },
};