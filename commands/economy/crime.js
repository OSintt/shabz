const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "crime",
  description: "With this command u can robbed others users!",
  auth: true,
  cooldown: 180000,
  run: async (client, message, args, usExists) => {
    const crimeWin = Math.floor(Math.random() * 1400) + 1
    const crimep = Math.floor(Math.random() * 950) + 1
    const probabilite = Math.floor(Math.random() * 100) + 1

    if(probabilite < 57){
        usExists.cash = usExists.cash - Number(crimep);
        await usExists.save();
        return error(message, `You have been fined \`${crimep}\` coins for trying to crime!`)
    }
    if(probabilite > 57){
        usExists.cash = usExists.cash + Number(crimeWin);
        await usExists.save();
        return success(message, `You committed a crime and earned \`${crimeWin}\` coins`)
    }
  },
};