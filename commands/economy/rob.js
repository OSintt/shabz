const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");

module.exports = {
  name: "rob",
  description: "With this command u can robbed others users!",
  auth: true,
  mention: true,
  cooldown: 300000,
  run: async (client, message, args, usExists) => {
    const usMention = message.mentions.users.first();

    const usUser = await User.findOne({ userId: usMention.id });
    if (!usUser) return error(message, "This user is not registed yet!");

    if (usMention === message.author) return error(message, "Nope");
    if (usUser.cash < 1) return error(message, "This user nove have money!");

    const getRob = (us) => Math.round(us.cash * ((Math.random() * 15) / 100));
    const probabilite = Math.floor(Math.random() * 3);
    console.log(probabilite);
    if (probabilite <= 1) {
      const cash = getRob(usExists);
      usExists.cash -= cash;
      error(
        message,
        `You tried to rob **${usMention.username}** and lost \`${cash}\``
      );
    } else {
      const cash = getRob(usUser);
      usUser.cash -= cash;
      usExists.cash += cash;
      error(
        message,
        `You just robbed **${usMention.username}** and won \`${cash}\``
      );
    }
    await usUser.save();
    return await usExists.save();
  },
};
