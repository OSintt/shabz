const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, success, hershell } = require("../lib/utils");

module.exports = {
  name: "marry",
  description: "With this command cann u marriage!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      let mention = message.mentions.members.first();
      if (usExists.marry.is) return error(message, "You already married!");
      if (!mention) return error(message, "You forgot to mention an user!");

      mention = await User.findOne({ userId: mention.id });
      if (!mention) return error(message, "Try 6register!");
      if (mention.id === message.author.id) return error(message, "Nope");
      if (mention.marry.is)
        return error(message, "This user is already married!");

      success(
        message,
        `Now you have to wait for **${mention.nick}** acceptation to finish the marriage! **[yes/no]**`
      );

      const collector = message.channel.createMessageCollector(
        (m) =>
          m.author.id === mention.userId && m.channel.id === message.channel.id,
        { time: 30000 }
      );

      collector.on("collect", async (collected) => {
        if (collected.author.id === mention.userId) {
          if (collected.content === "yes") {
            mention.marry = {
              is: true,
              date: new Date(),
              userId: usExists.userId,
            };
            usExists.marry = {
              is: true,
              date: new Date(),
              userId: mention.userId,
            };
            await mention.save();
            await usExists.save();

            success(
              message,
              `Congratulations on the marriage of **${mention.nick}** and **${usExists.nick}**`
            );
            return collector.stop();
          } else {
            error(
              message,
              `Well, **${usExists.nick}**... you'll have another chance...`
            );
            return collector.stop();
          }
        }
      });
      collector.on("end", async (collected) => {
        if (collected.size === 0)
          return error(message, "Well... I guess this wasn't the moment...");
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
