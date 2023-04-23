const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, checkInt } = require("../lib/utils");

module.exports = {
  name: "pay",
  description: "With this command u can take-out money!",
  auth: true,
  mention: true,
  run: async (client, message, args, usExists) => {
    try {
      args[0] = checkInt(usExists.cash, 'pay', args);
      usExists.cash -= args[0];
      usUser.cash += args[0];
      await usExists.save();
      await usUser.save();

      return message.reply({ embeds: [
        new EmbedBuilder()
        .setDescription(`**You've paid** \`${args[0]}\` **coins!**`)
        .setColor("#020202")
      ]})
    } catch(e) {
      return error(message, e.message);
    }
  },
};  