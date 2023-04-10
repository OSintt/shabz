const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "daily",
  decription: "With this command u can your daily reward!",
  cooldown: 86400000,
  auth: true,
  run: async (client, message, args, usExists) => {
    usExists.cash = usExists.cash + 1000;
    await usExists.save();
    const embed = new EmbedBuilder().setDescription(
      `You received ur daily reward!`
    );
    await message.channel.send({
      embeds: [embed],
    });
  },
};
