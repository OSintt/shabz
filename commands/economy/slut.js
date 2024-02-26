const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "slut",
  description: "With this command u can robbed others users!",
  auth: true,
  cooldown: 180000,
  run: async (client, message, args, usExists) => {
    const slutWin = Math.floor(Math.random() * 500) + 1;
    const slutp = Math.floor(Math.random() * 700) + 1;
    const probabilite = Math.floor(Math.random() * 100) + 1;

    if (usExists.cash < slutp) {
      usExists.cash = 0;
      await usExists.save();
      return error(
        message,
        `You have been fined \`${slutp}\` coins for trying to slut!`
      );
    }
    if (probabilite <= 67) {
      usExists.cash = usExists.cash - Number(slutp);
      await usExists.save();
      return error(
        message,
        `You have been fined \`${slutp}\` coins for trying to slut!`
      );
    }
    if (probabilite > 67) {
      usExists.cash = usExists.cash + Number(slutWin);
      await usExists.save();
      return success(
        message,
        `You committed a slut and earned \`${slutWin}\` coins`
      );
    }
  },
};
