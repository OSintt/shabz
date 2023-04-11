const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "rep",
  description: "With this command u can paid rep to users!",
  cooldown: 86400000,
  auth: true,
  run: async (client, message, args, usExists) => {

    const usMention = message.mentions.users.first();
    if(!usMention) return error(message, 'You forgot to mention a user')

    const usUser = await User.findOne({ userId: usMention.id });
    if(!usUser) return error(message, 'This user is not registed yet!')

    if(usMention === message.author) return error(message, 'Nope')

    usUser.rep = usUser.rep + 1;
    await usUser.save();

    const embed = new EmbedBuilder()
    .setDescription(`You just have given \`1\` rep to **${usMention.username}**`)

    message.channel.send({ embeds: [embed] })
},
};