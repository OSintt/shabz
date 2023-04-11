const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "pay",
  description: "With this command u can take-out money!",
  cooldown: 3000,
  auth: true,
  run: async (client, message, args, usExists) => {

    const usMention = message.mentions.users.first();
    if(!usMention) return error(message, 'You forgot to mention a user')

    const usUser = await User.findOne({ userId: usMention.id });
    if(!usUser) return error(message, 'This user is not registed yet!')

    if(!args[1]) return error(message, 'You forgot the amount to pay money')

    if(usMention === message.author) return error(message, 'Nope')

    if(args[1] === 'all') {
        if(usExists.cash < 1) return error(message, "You've no money in your wallet!")
        usUser.cash = usUser.cash + usExists.cash;
        usExists.cash = 0;
        await usUser.save();
        await usExists.save();

        message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription(`You just have paid \`all\` coins to **${usMention.username}**`)
        ]})
    }
    if(args[1] !== 'all') {
        if(args.join('').includes('.')) return error(message, 'That is not a valid amount!')
        if(isNaN(args[1])) return error(message, 'That is not a valid amount!')
        if(usExists.cash < 1) return error(message, "You've no money in your wallet!")
        if(args[1] > usExists.cash) return error(message, "You've no money in your wallet!")

        usUser.cash = usUser.cash + Number(args[1]);
        usExists.cash = usExists.cash - Number(args[1]);
        await usUser.save();
        await usExists.save();

      const embed = new EmbedBuilder()
      .setDescription(`**You've pay** \`${args[1]}\` **coins to ${usMention.username}!**`)

      message.channel.send({ embeds:[embed]})
    }
  },
};  