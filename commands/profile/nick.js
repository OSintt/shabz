const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "nick-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(!args.join(' ')) return error(message, 'You forgot to put u nicknamee')
    if(args.join(' ').includes('`')) return error(message, 'Pick ur nickname!')

    const user = usExists.marry
    const marry = await User.findOne({ userId: user })

    usExists.nick = args.join(' ')
    await usExists.save();

    const profile = new EmbedBuilder()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(usExists.avatar)
      .setFields(
        {
          name: `${usExists.emoji} Nick`,
          value: `\`${usExists.nick}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Rep`,
          value: `\`${usExists.rep}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Coins`,
          value: `\`${usExists.cash + usExists.bank}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Xp`,
          value: `\`${usExists.xp}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Items`,
          value: `\`${usExists.items}\``,
          inline: true,
        },
        {
          name: `${usExists.emoji} Married`,
          value: `\`${marry ? marry.nick : "Single!"}\``,
          inline: true,
        },
        {
          name: `Biografia`,
          value: `\`\`\`${usExists.bio}\`\`\``,
          inline: true,
        }
      );

    await message.channel.send({
      embeds: [profile],
    });
  },
};
