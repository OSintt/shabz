const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
let { error, hershell, us } = require("../lib/utils");

module.exports = {
  name: "top",
  decription: "You can see the leaderboard",
  cooldown: 3000,
  run: async (client, message, args) => {

    let data = User.find().sort({ coins: -1 })
    .where()
    const asd = data.slice(0, 10)
     usExists = await us(message);

     const pene = await User.findOne({ userId: message.author.id })
     
     if(!data) return error(message, "Nothing to see here yet!");
     const top = data.map((dato, i) => `${pene.emoji} ** ${i + 1} •** ${dato.nick} | **Coins:** \`${dato.cash}\``).join('\n') | "`No users with guild`"

     const embed = new EmbedBuilder()
     .setTitle("Leadeboard!")
     .setDescription(top)

     message.channel.send({ embeds: [embed] })

  //   if (!usExists) return error(message, 'You are not registered yet!');
  //   let data = await User.find().sort({ coins: -1 });
  //   data = data.slice(0, 10);
  //   if (!data) return error(message, "Nothing to see here yet!");
  //   const top = data.map(
  //     (dato, i) =>
  //       `${usExists.emoji} **${i + 1} •** ${dato.nick} | **Coins:** \`${
  //         dato.cash
  //       }\``
  //   );
  //   const lb = new EmbedBuilder()
  //   .setTitle("Leadeboard!")
  //   .setDescription(await top);
  //   message.channel.send({
  //     embeds: [lb],
  //   });
  },
};