const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "unblock",
  description: "With this command can u hugs!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      let mention = message.mentions.members.first();
      if (!mention) return error(message, "Forgot mentioned an user!");

      mention = await User.findOne({
        userId: mention.id,
      });
      if (!mention) return error(message, "This user is not registered yet!");

      const search = usExists.blockeds.find((b) => b.userId === mention.userId);
      if (!search) {
        return error(message, "You've not blocked that user");
      } else {
        await User.findOneAndUpdate(
          { userId: message.author.id },
          { $pull: { blockeds: { userId: mention.userId } } }
        );
      }

      console.log(usExists.blockeds);
    } catch (e) {
      return error(message, e.message);
    }
  },
};
