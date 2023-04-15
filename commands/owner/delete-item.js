const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Server = require("../../Schema/server");
module.exports = {
  name: "delete-item",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const data = await Server.findOne({ guildId: message.guild.id })

    await Server.deleteMany()

    message.channel.send({ content: 'asd'})
  },
};