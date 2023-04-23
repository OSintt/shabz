const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, checkInt } = require("../lib/utils");

module.exports = {
  name: "with",
  description: "With this command u can take-out money!",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {
    try {
      args[0] = checkInt(usExists.bank, "with", args)
      usExists.bank -= args[0];
      usExists.cash = args[0];
      await usExists.save();

      return message.reply({ embeds: [
        new EmbedBuilder()
        .setDescription(`**You've taken out** \`${args[0]}\` **coins!**`)
        .setColor("#020202")
      ]})
    } catch(e) {
      return error(message, e.message);
    }
  },
};