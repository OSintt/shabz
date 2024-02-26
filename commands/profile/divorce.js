const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell } = require("../lib/utils");

module.exports = {
  name: "divorce",
  description: "With this command can u divorce!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      //if(message.author.id !== hershell) return;

      // if (!usExists.marry.is) return error(message, "You're not married yet!");
      let mention = message.mentions.members.first();
      if (!mention) return error(message, "You forgot to mention an user!");

      mention = await User.findOne({
        userId: mention.id,
      });
      if (!mention) return error(message, "This user is not registered yet!");

      const marry = usExists.married.find((k) => k.userId === mention.userId);
      if (!marry) return error(message, "This user is not married to you");

      const embed = new EmbedBuilder().setDescription(
        `Are you sure want to get divorce from **${marry.nick}?** **[yes/no]**`
      );
      message.channel.send({ embeds: [embed] });

      const collector = message.channel.createMessageCollector(
        (m) =>
          m.author.id === m.author.id && m.channel.id === message.channel.id,
        { time: 9000 }
      );

      collector.on("collect", async (collected) => {
        if (collected.author.id === usExists.userId) {
          if (collected.content.toLowerCase() !== "yes")
            return error(message, "You made a good decision...");
          await User.findOneAndUpdate(
            { userId: usExists.userId },
            { $pull: { married: { userId: mention.userId } } }
          );
          await User.findOneAndUpdate(
            { userId: mention.userId },
            { $pull: { married: { userId: usExists.userId } } }
          );
          usExists.slots -= 1;
          mention.slots -= 1;
          await usExists.save();
          await mention.save();
          error(
            message,
            `You've just got divorced from **${marry.nick}**! I hope you don't regret soon :(`
          );
          return collector.stop();
        }
      });

      collector.on("end", async (collected) => {
        if (collected.size === 0) return error(message, "Time is over...");
        return collector.stop();
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
