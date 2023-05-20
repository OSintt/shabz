const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "pat",
  description: "With this command can u pats!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    let mention = message.mentions.members.first();
    if (!mention) return error(message, "You have to mention an user to pat!");
    mention = await User.findOne({
      userId: message.mentions.members.first().id,
    });
    if (!mention) return error(message, "Try 6 register first!");
    if (mention.userId === usExists.userId)
      return error(message, "You can't pat yourself!");
    mention.pats++;
    await mention.save();

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${usExists.nick}** caressed **${mention.nick}**\n${mention.nick} has received ${mention.pats} pats in total`
          )
          .setImage(star.pat()),
      ],
    });
  },
};
