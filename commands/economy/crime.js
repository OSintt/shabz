const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "crime",
  description: "With this command u can robbed others users!",
  auth: true,
  cooldown: 180000,
  run: async (client, message, args, usExists) => {
    const crimeWin = Math.floor(Math.random() * 1300) + 1
    const crimep = Math.floor(Math.random() * 800) + 1
    const probabilite = Math.floor(Math.random() * 100) + 1

    if(probabilite < 57){
        usExists.cash = usExists.cash - Number(crimep);
        await usExists.save();
        return error(message, `You have been fined \`${crimep}\` coins for trying to crime!`)
    }
    if(probabilite > 57){
        usExists.cash = usExists.cash + Number(crimeWin);
        await usExists.save();
        const embed = new EmbedBuilder()
      .setDescription(`You committed a crime and earned \`${crimeWin}\` coins`)

      message.channel.send({ embeds:[embed]})
    }
  },
};