const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us, hershell } = require("../lib/utils");

module.exports = {
  name: "kiss",
  description: "With this command u can kiss!",
  auth: true,
  mention: true,
  author: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      let mention = message.mentions.members.first();
      if (mention.id === client.user.id) return error(message, "Hey! >:c");
      if (mention.id === message.author.id) return error(message, "Nope");
      if (!mention)
        return error(message, "You have to mention someone to kiss!");
      mention = await User.findOne({
        userId: mention.id,
      });
      if (!mention) return error(message, "This user is not registered yet!");
      const search = mention.blockeds.find((b) => b.userId === usExists.userId);
      if (search) return error(message, "Nope");
      const kiss = usExists.kisses.find((k) => k.userId === mention.userId);
      if (!kiss) {
        usExists.kisses.push({
          userId: mention.userId,
          n: 1,
        });
        mention.kisses.push({
          userId: usExists.userId,
          n: 1,
        });
      } else {
        kiss.n++;
        mention.kisses.find((k) => k.userId === usExists.userId).n++;
      }
      await usExists.save();
      await mention.save();

      message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `**${usExists.nick}** kissed **${mention.nick}**\n**_${
                usExists.nick
              }_** and **_${mention.nick}_** has **_${
                kiss ? kiss.n : 1
              }_** kisses in total `
            )
            .setImage(star.kiss())
            .setColor(usExists.color),
        ],
      });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
