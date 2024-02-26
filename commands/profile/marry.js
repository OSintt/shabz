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
      if (!mention) return error(message, "You forgot to mention an user!");
      if (usExists.slots === usExists.slotsMax) return error(message, "You already married!");

      mention = await User.findOne({ userId: mention.id });
      if (!mention) return error(message, "Try 6register!");
      if (message.mentions.members.first().id === message.author.id) return error(message, "Nope");
      if (mention.slots === mention.slotsMax)
        return error(message, "This user is already married!");

        const usMarry = usExists.married.find((m) => m.userId === mention.userId)
        if(usMarry)
        return error(message, 'You are already married to this user!')

        const search = mention.blockeds.find((b) => b.userId === usExists.userId)
        if(search) return error(message, 'This user has blocked you')

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
            usExists.married.push({
              userId: mention.userId,
              nick: mention.nick,
              date: new Date(),
            });
            mention.married.push({
              userId: usExists.userId,
              nick: usExists.nick,
              date: new Date(),
            });
            mention.slots += 1;
            usExists.slots += 1;
            await mention.save();
            await usExists.save();

            success(
              message,
              `Congratulations on the marriage of **${mention.nick}** and **${usExists.nick}**`
            );
            return collector.stop();
          } else if(collected.content === "no") {
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