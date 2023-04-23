const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "with",
  description: "With this command u can take-out money!",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {
    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste la cantidad a retirar del banco"
        : "You forgot the amount to take-out money from the bank";

    if (!args[0]) return error(message, msg);

    if (args[0] === "all") {
      args[0] = usExists.bank;
    }
    args[0] = Math.round(args[0]);
    if(usExists.bank < args[0])
    return error(message, "This amount not is a valid!")
    if (usExists.bank < 1)
      return error(message, "You have no money to with");
    if (isNaN(args[0]) || args[0] == Infinity)
      return error(message, "That is not a valid amount!");

    usExists.bank -= args[0];
    usExists.cash += args[0];
    await usExists.save();

    return message.reply({ embeds: [
      new EmbedBuilder()
      .setDescription(`**You've taken out** \`${args[0]}\` **coins!**`)
      .setColor("#020202")
    ]})
  },
};