const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");
module.exports = {
  name: "ping",
  description: "You forgot to put u nicknamee",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) =>
    message.reply({ content: `${client.ws.ping}` }),
};
