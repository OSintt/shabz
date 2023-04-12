const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
module.exports = {
  name: "change",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const attachment = message.attachments.first()
    if(!attachment) return error(message, 'Argument undefined')

    client.user.setAvatar(attachment.url)

    message.channel.send({ content: 'oki'})
  },
};