const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Server = require("../../Schema/server");
module.exports = {
  name: "addEmoji",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const emoji = args[0]
    if(!emoji) return error(message, 'You forgot to put a emoji!')

    message.guild.emojis.create({ attachment: emoji, name: `${args[1]}`}).then(emoji => {
      return message.channel.send({ content: `${emoji}` })
    })
  },
};  