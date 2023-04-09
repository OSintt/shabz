const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "daily",
  decription: "With this command u can your daily reward!",
  cooldown: 86400000,
  run: async (client, message, args) => {
    if (await !us(message)) return error(message, "You are not registered yet!");
    const embed = new EmbedBuilder().setDescription(
      `You received ur daily reward!`
    );
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { cash: data.cash + Number(1000) }
    );
    await message.channel.send({
      embeds: [embed],
    });
  },
};
