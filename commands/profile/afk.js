const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "afk",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {
    usExists.afk = {
      afk: true,
      reason: args.length !== 0 ? args.join(" ") : 'discord.gg/peru'
    }
    await usExists.save();
    if(usExists.Language === 'Spanish'){
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: message.author.tag })
          .setTitle("Afk Establecido")
          .setDescription(`**Razón:** ${usExists.afk.reason}`)
          .setFooter({ text: "Avisaré a los que te mencionen!" }),
      ],
    });
    } else {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: message.author.tag })
            .setTitle("Afk Established")
            .setDescription(`**Reason:** ${usExists.afk.reason}`)
            .setFooter({ text: "I will notify those who mention u!" }),
        ],
      });
    }
  },
};