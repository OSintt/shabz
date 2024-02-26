const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error, getProfile } = require("../lib/utils");
module.exports = {
  name: "set",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    try {
      dato = args[0];
      value = args.slice(1).join(" ");
      value = args.slice(1).join(" ").replace(/`/gi, "");
      value = value.replace(/\n/gi, " ").trim();
      let data;
      const getTop = {
        nick: async () => {
          data = await User.find({ userId: usExists.id });
          if (!value)
            return error(message, "You forgot to set the value to edit!");
          if (value.length > 10) {
            value = value.slice(0, 9) + "...";
          }
          usExists.nick = value;
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        bio: async () => {
          data = await User.find({ userId: usExists.id });
          if (!value)
            return error(message, "You forgot to set the value to edit!");
          if (value.length > 20) {
            value = value.slice(0, 19) + "...";
          }
          usExists.bio = value;
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        emoji: async () => {
          data = await User.find({ userId: usExists.id });
          if (!value)
            return error(message, "You forgot to set the value to edit!");
          if (
            !value.match(/<:.+?:\d+>/g) &&
            !value.match(/<a:.+?:\d+>|<:.+?:\d+>/)
          )
            return error(message, "You forgot to enter your new emoji!");
          usExists.emoji = args[1];
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        avatar: async () => {
          data = await User.find({ userId: usExists.id });
          attachment = message.attachments.first();
          if (!attachment)
            return error(message, "You forgot to put your new avatar!");
          usExists.avatar = attachment.url;
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        color: async () => {
          data = await User.find({ userId: usExists.id });
          if (!value)
            return error(message, "You forgot to set the value to edit!");
          if (!value.match(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i))
            return error(message, "That's an invalid HEX color!");
          usExists.color = parseInt(value.replace("#", ""), 16);
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        prefix: async () => {
          data = await User.find({ userId: usExists.id });
          if (!value)
            return error(message, "You forgot to set the value to edit!");
          if (value.length === 4)
            return error(message, "Your prefix can't have 4 letters");
          usExists.prefix = args[1];
          await usExists.save();

          await message.reply({
            embeds: [await getProfile(message, usExists.userId, guild)],
          });
        },
        def: () => (data = null),
      };
      await (getTop[dato] || getTop["def"])();
      if (!data)
        return error(
          message,
          "__**Usage:**__:\n`6set <nick | avatar | emoji | bio | color | prefix>`"
        );
    } catch (e) {
      return error(message, e.message);
    }
  },
};
