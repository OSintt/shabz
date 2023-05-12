const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, checkInt, success } = require("../lib/utils");

module.exports = {
  name: "hen",
  description: "pene",
  auth: true,
  run: async (client, message, args, usExists) => {

    try {

        if(!usExists.hen.hen) return error(message, 'You need to buy a hen!')

        const probabilite = Math.floor(Math.random() * 100)

        args[0] = checkInt(usExists.cash, 'cock-fight', args);

    if(usExists.cash < args[0]) return error(message, "Don't try to bet more than you have!")

    if (probabilite < 50) {
        usExists.cash = usExists.cash - args[0]
        usExists.hen.hen = false;
        await usExists.save();
        return error(message, 'You lose coins!')
    } else {
        usExists.cash += args[0]
        await usExists.save();
        return success(message, 'You won coins!')
    }
    } catch(e) {
        return error(message, e.message)
    }
  },
};