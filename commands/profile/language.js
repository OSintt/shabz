const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "language-set",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    const language = args[0]
    if(!language) return error(message, 'You forgot to put the language of ur profile!')

    if(language === 'Spanish'){
        
    usExists.Language = "Spanish";
    await usExists.save();
    }

    
    if(language === 'English'){
        
        usExists.Language = "English";
        await usExists.save();
        }

    const user = usExists.marry
    const marry = await User.findOne({ userId: user })

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