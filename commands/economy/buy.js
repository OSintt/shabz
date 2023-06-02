const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "buy",
  description: "With this command u can robbed others users!",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {

    args = args[0]

    if ( args === 'hen') {

        if(usExists.cash < 2000) return error(message, 'You need to more money to buy a hen!')

        usExists.hen = {
            hen: true
        }
        usExists.cash -= 2000;
        await usExists.save();

        success(message, 'You bought the hen correctly!')
    } else {
        error(message, "That item doesn't exist!")
    }
  },
};