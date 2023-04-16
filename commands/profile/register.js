const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "register",
  description: "With this command can u register!",
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
          getProfile(message, usExists)
        ]})
      }, 3000)
    })
  },
};
