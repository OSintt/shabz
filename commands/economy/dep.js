const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, checkInt } = require("../lib/utils");

module.exports = {
  name: "dep",
  description: "With this command u can your daily reward!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      args[0] = checkInt(usExists.cash, "dep", args);
      usExists.bank += args[0];
      usExists.cash -= args[0];
      await usExists.save();
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`**You've deposited** \`${args[0]}\` **coins!**`)
            .setColor("#020202"),
        ],
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};