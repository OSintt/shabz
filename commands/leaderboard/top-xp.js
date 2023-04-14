const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils")
module.exports = {
  name: "top-xp",
  decription: "You can see the leaderboard",
  auth: true,
  run: async (client, message, args, usExists) => {

    let data = await User.find().sort({ xp: -1 })  
    data = data.slice(0, 10);

    const top = data.map((dato, i) => `${usExists.emoji} **${i === 0 ? "1" : i + 1} •** ${dato.nick} | **Xp**: \`${dato.xp}\``).join('\n')

    const embed = new EmbedBuilder()

    .setTitle('Users top in xp!')
    .setDescription(`${top}`)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] })

  },
};