const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us} = require("../lib/utils");
module.exports = {
  name: "edit",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const usMention = message.mentions.users.first();
    if(!usMention) return error(message, 'You forgot the mention a user!')

    const usUser = await User.findOne({ userId: usMention.id })
    if(!usUser) return error(message, 'This user is not registered yet!')

    usUser.cash = Number(args[1])
    await usUser.save();

    message.channel.send({ content: 'el nick de ese negro ha sido cambiado!'})
  },
};
