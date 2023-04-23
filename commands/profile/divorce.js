const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");

module.exports = {
  name: "divorce",
  description: "With this command can u divorce!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    if (!usExists.marry) return error(message, "You're not married yet!");

    const marry = await User.findOne({ userId: usProfile.marry });

    const embed = new EmbedBuilder().setDescription(
      `Are you sure want to get divorce from **${usUser.nick}?** **[yes/no]**`
    );
    message.channel.send({ embeds: [embed] });

    const collector = message.channel.createMessageCollector(
      (m) => m.author.id === m.author.id && m.channel.id === message.channel.id,
      { time: 9000 }
    );

    collector.on("collect", async (collected) => {
      if (message.author.id !== usProfile.marry) return;
      if (collected.content.toLowerCase() !== "yes")
        return error(message, "You made a good decision...");
      usExists.marry = null;
      marry.marry = null;
      await usExists.save();
      await marry.save();
      error(
        message,
        `You've just got divorced from ${marry.nick}! I hope you don't regret soon :(`
      );
      return collector.stop();
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) return error(message, "Time is over...");
      return collector.stop();
    });
  },
};
