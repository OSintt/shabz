const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");

const error = (message, msg) => {
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor('FF0000')],
  });
};

const hershell = "793161028988960798";
module.exports = { hershell, error };