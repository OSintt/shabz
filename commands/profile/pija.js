const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "pija",
  description: "You forgot to put u nicknamee",
  auth: true,
  run: async (client, message, args, usExists) => {

    const usMention = message.mentions.users.first() || message.author;
    const usUser = await User.findOne({ userId: usMention.id })
    

    if(usExists.Language === 'Spanish'){
  
      const usUser = await User.findOne({ userId: usMention.id })
      if(!usUser) return error(message, 'Pruebe primero 6register')

      const pija = new EmbedBuilder()
      .setDescription(`**${usUser.nick}'s tu pija mide:** \`${usUser.pija} cm\``)
      .setImage('https://i.etsystatic.com/10683557/c/1593/1267/701/401/il/3e8d2b/2769207919/il_340x270.2769207919_mvne.jpg')
      .setFooter({
        text: 'Not happy with your pija? Try 6changePija to get a new one!'
      })
      message.channel.send({ embeds: [ pija ]})

    } else {
  
      const usUser = await User.findOne({ userId: usMention.id })
      if(!usUser) return error(message, 'Try 6register first!')
    }

    const pija = new EmbedBuilder()
      .setDescription(`**${usUser.nick}'s pija lengths:** \`${usUser.pija} cm\``)
      .setImage('https://i.etsystatic.com/10683557/c/1593/1267/701/401/il/3e8d2b/2769207919/il_340x270.2769207919_mvne.jpg')
      .setFooter({
        text: 'Not happy with your pija? Try 6changePija to get a new one!'
      })
      message.channel.send({ embeds: [ pija ]})
  },
};