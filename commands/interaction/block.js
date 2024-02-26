const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "block",
  description: "With this command can u hugs!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      let mention = message.mentions.members.first();
      if (!mention)
        return error(message, "You have to mention someone to block!");
      if (mention.id === message.author.id) return error(message, "Nope");
      mention = await User.findOne({
        userId: mention.id,
      });
      if (!mention) return error(message, "This user is not registered yet!");
      const block = usExists.blockeds.find((b) => b.userId === mention.userId);
      if (!block) {
        usExists.blockeds.push({
          userId: mention.userId,
          nick: mention.nick,
        });
      } else {
        return error(message, "This user is already on your blocked list");
      }

      await usExists.save();
      console.log(usExists.blockeds);

      success(message, "Ready!");
    } catch (e) {
      return error(message, e.message);
    }
  },
};
