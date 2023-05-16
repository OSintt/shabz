const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "emoji-set",
  description: "You forgot to put u emote!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
    args = args[0];
    if (!args) return error(message, "You forgot to put your new emoji!");
    if (
      !args.match(/<:.+?:\d+>/g) &&
      !args.match(/<a:.+?:\d+>|<:.+?:\d+>/)
    )
      return error(message, "You forgot to enter your new emoji!");
    usExists.emoji = args;
    await usExists.save();

    message.channel
      .send({ content: `Editing the emojis of ur profile to ${args}...` })
      .then((r) => {
        setTimeout(async () => {
          r.edit({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        }, 1000);
      })
    } catch(e) {
      return error(message, e.message)
    }
  },
};
