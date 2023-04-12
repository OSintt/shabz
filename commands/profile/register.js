const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "register",
  description: "With this command can u register!",
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    if (usExists) return error(message, "You're alredy registered!");

    const pene = [1, 2, 3, 4, 5, 6 ,7 ,8 ,9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const nuevo = new User({
      userId: message.author.id,
      nick: message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
      pija: Math.floor(Math.random() * pene.length)
    });
    await nuevo.save();
    return message.channel.send({
      embeds:[new EmbedBuilder().setDescription('Creating profile, wait a moment...')]
    }).then(r => {
      setTimeout(() => {
        r.edit({ embeds:[
          new EmbedBuilder()
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
          .setColor('#00ff00')
          .setFields({
            name: "Nick", value: `\`${message.author.username}\``, inline: true
          },
          {
            name: "Rep", value: `\`0\``, inline: true
          },
          {
            name: "Coins", value: `\`0\``, inline: true
          },
          {
            name: "Items", value: `\`0\``, inline: true
          },
          {
            name: "Xp", value: `\`0\``, inline: true
          },
          {
            name: "Hugs", value: `\`0\``, inline: true
          },
          {
            name: "Pats", value: `\`0\``, inline: true
          },
          {
            name: "Married", value: `\`Single!\``, inline: true
          },
          {
            name: "Bio", value: `\`\`\`No bio yet!\`\`\``
          })
          .setTimestamp()
        ]})
      }, 3000)
    })
  },
};
