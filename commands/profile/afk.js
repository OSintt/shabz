const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error } = require("../lib/utils");
module.exports = {
  name: "afk",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {
    if (usExists.afk.afk) return;
    
    await message.member.setNickname(`x { 🍩 } ${message.author.nick ? message.author.nick : message.author.username}`)
      .catch(() => console.log('owo'));

    usExists.afk = {
      afk: true,
      reason: args.length !== 0 ? args.join(" ") : "discord.gg/shabz",
    };
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag })
      .setTitle("Afk Established")
      .setDescription(`**Reason:** ${usExists.afk.reason}`)
      .setColor(usExists.color)
      .setFooter({ text: "I will notify those who mention u!" });

    await usExists.save();
    return message.channel.send({ embeds: [embed] });
  },
};
