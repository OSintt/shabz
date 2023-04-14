const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "top-bank",
  decription: "You can see the leaderboard",
  auth: true,
  run: async (client, message, args, usExists) => {

    let data = await User.find().sort({ bank: -1 })  
    data = data.slice(0, 10);

    const top = data.map((dato, i) => `${usExists.emoji} **${i === 0 ? "1" : i + 1} •** ${dato.nick} | **Bank**: \`${dato.bank}\``).join('\n')

    const embed = new EmbedBuilder()

    .setTitle('Users top in bank!')
    .setDescription(`${top}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};  