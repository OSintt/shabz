const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "rep",
  description: "With this command u can paid rep to users!",
  auth: true,
  mention: true,
  author: true,
  cooldown: 86400000,
  run: async (client, message, args, usExists) => {
    try {
      const usMention = message.mentions.members.first();
      if (usMention.id === message.author.id) return error(message, "Nope");

      const usUser = await User.findOne({ userId: usMention.id });
      if (!usUser) return error(message, "This user is not registed yet!");

      if (usExists.rep >= 1) {
        usUser.rep = usUser.rep + 1;
        usExists.rep = usExists.rep - 1;
        await usExists.save();
        await usUser.save();

        return success(
          message,
          `You just have given \`1\` rep to **${usUser.nick}**`
        );
      }

      usUser.rep = usUser.rep + 1;
      await usUser.save();

      return success(
        message,
        `You just have given \`1\` rep to **${usUser.nick}**`
      );
    } catch (e) {
      return error(message, e.message);
    }
  },
};
