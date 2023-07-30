const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Server = require("../../Schema/server");
module.exports = {
  name: "emojis",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const asd = message.guild.emojis.cache.size

    message.channel.send({ content: `${asd.url}`})
  },
};  