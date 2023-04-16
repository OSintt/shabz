const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const ordinal = require('ordinal');
const { error } = require("../lib/utils");
module.exports = {
  name: "rank",
  description: "With this command can u see rank!",
  auth: true,
  run: async (client, message, args, usExists) => {
    args = args[0];
    const mention = message.mentions.users.first() || message.author;
    const user = await User.findOne({ userId: mention.id });
    if (!user) return error(message, "Try `6register` first!");
    let data;
    const getTop = {
      xp: async () => (data = await User.find().sort({ xp: -1 })),
      rep: async () => (data = await User.find().sort({ rep: -1 })),
      coins: async () => (data = await User.find().sort({ coins: -1 })),
      "def": () => (data = null),
    };
    await (getTop[args] || getTop["def"])();
    if (!data)
      return error(message, "__**Usage:**__:\n`6rank <xp | rep | coins>`");
    const rank = data.findIndex((u) => u.userId === user.userId);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: mention.tag,
        iconURL: mention.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `**${user.nick}** is in the **${ordinal(rank)}** position\nspeaking about \`${args}\`!`
      )
      .setThumbnail(user.avatar);

    message.channel.send({ embeds: [embed] });
  },
};
