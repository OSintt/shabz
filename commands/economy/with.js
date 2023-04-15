const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "take-out",
  description: "With this command u can take-out money!",
  auth: true,
  run: async (client, message, args, usExists) => {

    const msg =
    usExists.Language === "Spanish"
    ? "Olvidaste la cantidad a retirar del banco"
    : "You forgot the amount to take-out money from the bank"

    if(!args[0]) return error(message, msg)

    if(args[0] === 'all') {
        if(usExists.bank < 1) return error(message, "You've no money in your bank!")
        usExists.cash = usExists.cash + usExists.bank
        usExists.bank = 0;
        await usExists.save();

        message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription("You've take-out all the money from the bank")
        ]})
    }
    if(args[0] !== 'all') {
        if(args.join('').includes('-')) return error(message, 'That is not a valid amount!')
        if(args.join('').includes('.')) return error(message, 'That is not a valid amount!')
        if(isNaN(args[0])) return error(message, 'That is not a valid amount!')
        if(usExists.bank < 1) return error(message, "You've no money in your wallet!")
        if(args[0] > usExists.bank) return error(message, "You've no money in your wallet!")

        usExists.bank = usExists.bank - Number(args[0])
        usExists.cash = usExists.cash + Number(args[0]);
        await usExists.save();

      const embed = new EmbedBuilder()
      .setDescription(`**You've take-out** \`${args[0]}\` **coins!**`)

      message.channel.send({ embeds:[embed]})
    }
  },
};