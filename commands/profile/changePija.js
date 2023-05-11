const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");
module.exports = {
  name: "changePija",
  description: "You forgot to put u nicknamee",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    if (usExists.cash < 5000) return error(message, "You don't have the enough coins to change your pija's length!");
    usExists.pija = Math.round(Math.random() * 69);
    await usExists.save();
    success(message, "Your new pija's length is: " + usExists.pija);
  },
};