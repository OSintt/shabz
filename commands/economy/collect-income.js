const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "collect-income",
  description: "pene",
  auth: true,
  cooldown: 86400000,
  run: async (client, message, args, usExists) => {
    if (!message.member.roles.cache.has("1093988810943107175"))
      return error(message, "Nope");

    usExists.cash = usExists.cash + 10000;
    await usExists.save();

    const embed = new EmbedBuilder()
      .setDescription(`Ganaste \`1000\` coins!`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
