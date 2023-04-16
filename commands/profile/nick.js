const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile} = require("../lib/utils");
module.exports = {
  name: "nick-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste poner tu nick!"
        : "You forgot to put ur new nick!";

    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\n/gi, " ").trim();
    if (!args) return error(message, msg);
    if (args.length > 10) {
      args = args.slice(0, 9) + "...";
    }
    usExists.nick = args;
    await usExists.save();
    await message.channel.send({
      embeds: [await getProfile(message, usExists.userId)],
    });
  },
};
