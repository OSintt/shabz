const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us} = require("../lib/utils");
module.exports = {
  name: "ads",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const user = message.mentions.members.first();

    user.roles.add('1093740276029333584')

    message.channel.send({ content: `${usExists.color}` })

  },
};  