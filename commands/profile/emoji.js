const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "emoji-set",
  description: "You forgot to put u emote!",
  auth: true,
  run: async (client, message, args, usExists, guild) => {
    args = args[0];
    const msg =
      usExists.Language === "Spanish"
        ? "Olvidaste poner tu emoji!"
        : "You forgot to put your emoji!";
    if (!args) return error(message, msg);

    const emoji = message.guild.emojis.cache.find(
      (x) => x.name === args[0].split(":")[1]
    );
    if (!emoji) return error(message, "That emoji is not on the server!");
    usExists.emoji = args;
    await usExists.save();

    message.channel
      .send({ content: `Editing the emojis of ur profile to ${args}...` })
      .then((r) => {
        setTimeout(async () => {
          r.edit({
            embeds: [await getProfile(message, usExists.id, guild)],
          });
        }, 3000);
      });
  },
};
