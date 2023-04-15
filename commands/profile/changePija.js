const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "changePija",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {
    const msg =
      usExists.Language === "Spanish"
        ? "¡No tienes las monedas suficientes para cambiar el tamaño de tu pija!"
        : "You don't have the enough coins to change your pija's length!";
    if (usExists.cash < 5000) return error(message, msg);
    usExists.pija = Math.round(Math.random() * 69);
    await usExists.save();
    error(message, "Your new pija's length is: " + usExists.pija);
  },
};