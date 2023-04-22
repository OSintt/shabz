const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils");
module.exports = {
  name: "top",
  decription: "You can see the leaderboard",
  auth: true,
  run: async (client, message, args, usExists) => {
    args = args[0];
    let data;
    const getTop = {
      xp: async () => (data = await User.find().sort({ xp: -1 })),
      rep: async () => (data = await User.find().sort({ rep: -1 })),
      cash: async () => (data = await User.find().sort({ cash: -1 })),
      pija: async () => (data = await User.find().sort({ pija: -1 })),
      bank: async () => (data = await User.find().sort({ bank: -1 })),
      def: () => (data = null),
    };
    await (getTop[args] || getTop["def"])();
    if (!data)
      return error(
        message,
        "__**Usage:**__:\n`6top <xp | rep | cash | bank | pija>`"
      );
    data = data.slice(0, 10);
    const top = data
      .map(
        (u, i) =>
          `${usExists.emoji} **${i + 1}** • ${u.nick} | **${args}**: \`${
            u[args]
          }\``
      )
      .join("\n")

    const embed = new EmbedBuilder()
      .setTitle(`Users top in ${args}!`)
      .setDescription(`${top}`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};