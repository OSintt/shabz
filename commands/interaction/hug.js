const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "hug",
  description: "With this command u can hugs!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    let mention = message.mentions.members.first();
    if (!mention) return error(message, "You have to mention an user to hug!");
    mention = await User.findOne({
      userId: message.mentions.members.first().id,
    });
    if (!mention) return error(message, "Try 6 register first!");
    if (mention.userId === usExists.userId) return error(message, "You can't hug yourself!");
    mention.hugs++;
    await mention.save();

    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${usExists.nick}** hugged **${mention.nick}**\n*${mention.nick}* has received *${mention.hugs}* hugs in total `
          )
          .setImage(star.hug()),
      ],
    });
  },
};
