const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "rob",
  description: "With this command u can robbed others users!",
  auth: true,
  mention: true,
  cooldown: 300000,
  run: async (client, message, args, usExists) => {

    const usMention = message.mentions.users.first();

    const usUser = await User.findOne({ userId: usMention.id });
    if(!usUser) return error(message, 'This user is not registed yet!')

    if(usMention === message.author) return error(message, 'Nope')
    if(usUser.cash < 1) return error(message, 'This user nove have money!')

    const rob = Math.floor(Math.random() * usUser.cash) + 1
    const probabilite = Math.floor(Math.random() * 100) + 1

    if(usExists.cash < rob){
        usExists.cash = 0;
        await usExists.save();
    }
    if(probabilite < 57){
        usExists.cash = usExists.cash - Number(rob);
        await usExists.save();
        return error(message, `You tried robbed to **${usMention.username}** and lost \`${rob}\``)
    }
    if(probabilite > 57){
        usUser.cash = usUser.cash - Number(rob);
        usExists.cash = usExists.cash + Number(rob);
        await usUser.save();
        await usExists.save();
        const embed = new EmbedBuilder()
      .setDescription(`You just robbed to **${usMention.username}** and won \`${rob}\``)

      message.channel.send({ embeds:[embed]})
    }
  },
};  