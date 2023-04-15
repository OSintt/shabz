const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "afk",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {
    if (usExists.afk.afk) return;
    usExists.afk = {
      afk: true,
      reason: args.length !== 0 ? args.join(" ") : "discord.gg/peru",
    };
    const embed =
      usExists.language === "Spanish"
        ? new EmbedBuilder()
            .setAuthor({ name: message.author.tag })
            .setTitle("Afk Establecido")
            .setDescription(`**Razón:** ${usExists.afk.reason}`)
            .setFooter({ text: "Avisaré a los que te mencionen!" })
        : new EmbedBuilder()
            .setAuthor({ name: message.author.tag })
            .setTitle("Afk Established")
            .setDescription(`**Reason:** ${usExists.afk.reason}`)
            .setFooter({ text: "I will notify those who mention u!" });

    await usExists.save();
    return message.channel.send({ embeds: [embed] });
  },
};
