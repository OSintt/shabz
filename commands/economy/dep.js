const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "dep",
  description: "With this command u can your daily reward!",
  auth: true,
  run: async (client, message, args, usExists) => {
    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste la cantidad a depositar al banco"
        : "You forgot the amount to deposit money from to bank";

    if (!args[0]) return error(message, msg);
    if (args[0] < 1) return error(message, 'Are you stupid?');
    if (args[0] === "all") {
      args[0] = usExists.cash;
    }
    args[0] = Math.round(args[0]);
    if (usExists.cash < 1)
      return error(message, "You've no money in your wallet!");
    if (isNaN(args[0]) || args[0] == Infinity) return error(message, "That is not a valid amount!");

    usExists.bank += args[0];
    usExists.cash -= args[0];
    await usExists.save();
    return error(message, `**You've deposited** \`${args[0]}\` **coins!**`);
  },
};
