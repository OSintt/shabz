const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, checkInt, success, winner, lost, hershell } = require("../lib/utils");

module.exports = {
  name: "bet",
  description: "pene",
  auth: true,
  run: async (client, message, args, usExists) => {

    try {

        if(message.author.id !== hershell) return;

        const Myd = ["✌️", "👊", "🤚"]

        const bot = Myd[Math.floor(Math.random() * Myd.length)]
        const user = Myd[Math.floor(Math.random() * Myd.length)]

        args[0] = checkInt(usExists.cash, 'bet', args);

    if(usExists.cash < args[0]) return error(message, "Don't try to bet more than you have!")

    if(bot === user) {

        success(message, `Empate`)
    } else if (user === '✌️' && bot === '👊') {
        usExists.cash -= args[0];
        await usExists.save();

        lost(message, `\`${bot}\``, `\`${user}\``)
    } else if (user === '✌️' && bot === '🤚') {
        usExists.cash += args[0];
        await usExists.save();

        winner(message, `\`${bot}\``, `\`${user}\``)
    } else if (user === '👊' && bot === '🤚') {

        usExists.cash -= args[0];
        await usExists.save();

        lost(message, `\`${bot}\``, `\`${user}\``)
    } else if (user === '👊' && bot === '✌️') {

        usExists.cash += args[0];
        await usExists.save();

        winner(message, `\`${bot}\``, `\`${user}\``)
    }

    } catch(e) {
        return error(message, e.message)
    }
  },
};