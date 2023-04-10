const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "dep",
  decription: "With this command u can your daily reward!",
  cooldown: 3000,
  auth: true,
  run: async (client, message, args, usExists) => {

    if(!args[0]) return error(message, 'Forgot the amount a deposit!')

    if(args[0] === 'all') {
        if(usExists.cash < 1) return error(message, "You've no money in your wallet!")
        usExists.bank = usExists.bank + usExists.cash
        usExists.cash = 0;
        await usExists.save();

        message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription("You've deposited all money!")
        ]})
    }
    if(args[0] !== 'all') {
        if(args.join('').includes('.')) return error(message, 'That is not a valid amount!')
        if(isNaN(args[0])) return error(message, 'That is not a valid amount!')
        if(usExists.cash < 1) return error(message, "You've no money in your wallet!")
        if(args[0] > usExists.cash) return error(message, "You've no money in your wallet!")

        usExists.bank = usExists.bank + Number(args[0]);
        usExists.cash = usExists.cash - Number(args[0]);
        await usExists.save();

      const embed = new EmbedBuilder()
      .setDescription(`**You've deposited** \`${args[0]}\` **coins!**`)

      message.channel.send({ embeds:[embed]})
    }
  },
};
