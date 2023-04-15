const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "top",
  decription: "You can see the leaderboard",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    let data = await User.find()
    asd = data.slice(0, 10);

    const top = asd.map((dato, i) => `${usExists.emoji} **${i === 0 ? "1" : i + 1} •** ${dato.nick} | **Coins**: \`${dato.cash + dato.bank}\``).join('\n')

    const embed = new EmbedBuilder()

    .setTitle('Users top in economy!')
    .setDescription(`${top}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};