const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, getProfile } = require("../lib/utils");
module.exports = {
  name: "avatar-set",
  description: "You forgot to put u avatar!",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
    const usAvatar = message.attachments.first();
    if (!usAvatar) return error(message, "You forgot to put your new avatar!");
    usExists.avatar = usAvatar.url;
    await usExists.save();
    await message.reply({
      embeds: [await getProfile(message, usExists.userId, guild)],
    })
    } catch(e) {
      return error(message, e.message)
    }
  },
};
