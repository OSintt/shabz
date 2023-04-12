const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "change-pija",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    const pija = Math.floor(Math.random(0, 20))
    const pijaWin = Math.floor(Math.random(20, 40))
    const probabilite = Math.floor(Math.random() * 100)

    if(usExists.cash < 5000) return error(message, "You don't have the necessary amount of coins to change your pija's length!")

    if(probabilite < 57){
        usExists.cash = usExists.cash - 5000;
        usExists.pija = usExists.pija - pija;
        await usExists.save();

        message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription("Your pija's has been changed successfully!")
        ]})
        }
        if(probabilite > 57){
            usExists.cash = usExists.cash - 5000;
            usExists.pija = usExists.pija + pijaWin;
            await usExists.save();
            
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setDescription("Your pija's has been changed successfully!d")
            ]})
        }
  },
};