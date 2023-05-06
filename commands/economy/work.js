const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, success } = require('../lib/utils')

module.exports = {
  name: "work",
  description: "With this command u can work!",
  auth: true,
  cooldown: 300000,
  run: async (client, message, args, usExists) => {
    const random = Math.floor(Math.random() * 1000) + 1;
 
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { cash: usExists.cash + Number(random) }
    );
    await success(message, `You worked and earn **${random}** coins!`)
  },
};