const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");

module.exports = {
  name: "work",
  description: "With this command u can work!",
  auth: true,
  cooldown: 3000 * 100,
  run: async (client, message, args, usExists) => {
    const random = Math.floor(Math.random() * 500) + 100;
    const embed = new EmbedBuilder()
      .setDescription(`You worked and earn **${random}** coins!`)
      .setColor("#020202");
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { cash: usExists.cash + Number(random) }
    );
    await message.channel.send({
      embeds: [embed],
    });
  },
};