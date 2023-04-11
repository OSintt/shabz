const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "register",
  description: "With this command can u register!",
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    if (usExists) return error(message, "You're alredy registered!");
    const nuevo = new User({
      userId: message.author.id,
      nick: message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
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
            name: "Married", value: `\`Single!\``, inline: true
          },
          {
            name: "Bio", value: `\`\`\`No bio yet!\`\`\``, inline: true
          })
          .setTimestamp()
        ]})
      }, 3000)
    })
  },
};
