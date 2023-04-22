const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "pay",
  description: "With this command u can take-out money!",
  auth: true,
  mention: true,
  run: async (client, message, args, usExists) => {

    const msg =
    usExists.Language === "Spanish"
    ? "Olvidaste mencionar a un usuario!"
    : "You forgot to mention an user!"

    const msg2 = usExists.Language === "Spanish"
    ? "Olvidaste la cantidad de dinero que pagarás al usuario!"
    : "You forgot the amount to pay money!"

    const usUser = await User.findOne({ userId: message.mentions.members.first().id });
    if(!usUser) return error(message, 'This user is not registed yet!')

    if(!args[1]) return error(message, msg2)

    if(usMention === message.author) return error(message, 'Nope')

    if (args[1] === "all") {
      args[1] = usExists.cash;
    }
    args[1] = Math.round(args[1])
    if(usExists.cash < args[1])
    return error(message, "You've no money in your wallet!")
    if (usExists.bank < 1)
      return error(message, "You've no money to paid to user!");
    if (isNaN(args[1]) || args[1] == Infinity)
      return error(message, "That is not a valid amount!");

    usExists.cash -= args[1];
    usUser.cash += args[1];
    await usExists.save();
    await usUser.save();

    return message.reply({ embeds: [
      new EmbedBuilder()
      .setDescription(`**You've paid** \`${args[1]}\` **coins!**`)
      .setColor("#020202")
    ]})
  },
};  