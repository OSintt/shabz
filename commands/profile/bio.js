const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "bio-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    var maxLen = 20

    if(usExists.Language === 'Spanish'){
      if(args.join(' ').length > maxLen) return error(message, 'Tu apodo no puede tener más de 20 letras!')
    if(!args.join(' ')) return error(message, 'Olvidaste poner tu biografia!')
    if(args.join(' ').includes('`')) return error(message, 'Escribe tu nueva biografia!')
    } else {
      if(args.join(' ').length > maxLen) return error(message, 'Your nickname cannot be longer than 20 letters!')
    if(!args.join(' ')) return error(message, 'You forgot to put u biografia!')
    if(args.join(' ').includes('`')) return error(message, 'Write ur new biografia!')
    }

    const user = usExists.marry
    const marry = await User.findOne({ userId: user })

    usExists.bio = args.join(' ')
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
          name: `${usExists.emoji} Hugs`,
          value: `\`${usExists.hugs}\``,
          inline: true
        },
        {
          name: `${usExists.emoji} Pats`,
          value: `\`${usExists.pats}\``,
          inline: true
        },
        {
          name: `${usExists.emoji} Language`,
          value: `\`${usExists.Language}\``,
          inline: true
        },
        {
          name: `${usExists.emoji} Married`,
          value: `\`${marry ? marry.nick : "Single!"}\``,
          inline: true,
        },
        {
          name: `Biografia`,
          value: `\`\`\`${usExists.bio}\`\`\``,
        }
      );

    await message.channel.send({
      embeds: [profile],
    });
  },
};