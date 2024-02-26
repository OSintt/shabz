const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, getProfile, success } = require("../lib/utils");
module.exports = {
  name: "invite",
  description: "asd",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists, guild) => {
    const embed = new EmbedBuilder()

      .setTitle("Bot from server!")
      .setDescription(
        `[Client Link](https://discord.com/api/oauth2/authorize?client_id=1085061015982592100&permissions=8&scope=bot)`
      )
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
      .addFields(
        {
          name: `7kawaii`,
          value: `pene`,
          inline: true,
        },
        {
          name: `7cute`,
          value: "qqq",
          inline: true,
        },
        {
          name: `7clean`,
          value: `&ads`,
          inline: true,
        },
        {
          name: `7bad`,
          value: `&ads`,
          inline: true,
        },
        {
          name: `7bad`,
          value: `&ads`,
          inline: true,
        }
      );

    message.reply({ embeds: [embed] });
  },
};
