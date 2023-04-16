const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile } = require("../lib/utils");
module.exports = {
  name: "bio-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {
    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste poner tu biografia!"
        : "You forgot to put ur new bio!";

    args = args.join(" ").replace(/`/gi, "");
    args = args.replace(/\n/gi, " ").trim();
    if (!args) return error(message, msg);
    if (args.length > 20) {
      args = args.slice(0, 19) + "...";
    }

    const marry = await User.findOne({ userId: usExists.marry });
    usExists.bio = args;
    await usExists.save();
    return message.channel.send({
      embeds: [await getProfile(message, usExists.userId)],
    });
  },
};
