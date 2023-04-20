const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "daily",
  description: "With this command u can your daily reward!",
  cooldown: 86400000,
  auth: true,
  run: async (client, message, args, usExists) => {

    message.reply({ embeds: [
      new EmbedBuilder()
      .setDescription('You received your `2000` daily coins')
      .setColor('#020202')
    ]});
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { cash: usExists.cash + Number(1000) }
    )
  },
};