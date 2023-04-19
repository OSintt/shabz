const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
module.exports = {
  name: "changebal",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const usMention = message.mentions.users.first();
    if(!usMention) return error(message, 'You forgot to mention a user!')

    const usUser = await User.findOne({ userId: usMention.id })
    if(!usUser) return error(message, 'This user is not registered yet!')

    const amount = args[1]
    if(!amount) return error(message, 'You forgot the amount!')

    usUser.cash = amount;
    await usUser.save();

    message.channel.send({ embeds: [
        new EmbedBuilder()
        .setDescription(`The bal from ${usMention.username} is current ${usUser.cash}`)
    ]})
  },
};