const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
module.exports = {
  name: "top",
  decription: "You can see the leaderboard",
  cooldown: 3000 * 100,
  auth: true,
  run: async (client, message, args) => {
    let data = await User.find().sort({ coins: -1 });
    data = data.slice(0, 10);
    if (!data <= 0) return error(message, "Nothing to see here yet!");
    const top = asd.map(
      (dato, i) =>
        `${usExists.emoji} **${i + 1} •** ${dato.nick} | **Coins:** \`${
          dato.cash + dato.bank
        }\``
    );
    const lb = new EmbedBuilder().setTitle("Leadeboard!").setDescription(top);
    message.channel.send({
      embeds: [lb],
    });
  },
};
