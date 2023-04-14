const { EmbedBuilder, Embed } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "rank",
  description: "With this command can u see rank!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(!args[0]) return error(message, '__**Usage:**__:\n\`6rank <xp | rep | coins>\`')

    const usMention = message.mentions.users.first() || message.author

    const usUser = await User.findOne({ userId: usMention.id })
    if(!usUser) return error(message, 'Try `6register` first!');

    if(args[0] === 'xp'){

    let data = await User.find().sort({ xp: -1 })  
    data = data.slice(0, 10);

    const rankUser = data.findIndex(dataUser => dataUser.userId === usMention.id)

        const embed = new EmbedBuilder()
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**${usUser.nick}** is in the **${rankUser}** position\nspeaking about \`xp\`!`)
        .setThumbnail(usUser.avatar)
        
        message.channel.send({ embeds: [embed] })
        }
    if(args[0] === 'rep'){

        let data = await User.find().sort({ rep: -1 })  
    data = data.slice(0, 10);

    const rankUser = data.findIndex(dataUser => dataUser.userId === usMention.id)

        const embed = new EmbedBuilder()
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**${usUser.nick}** is in the **${rankUser}** position\nspeaking about \`rep\`!`)
        .setThumbnail(usUser.avatar)
            
        message.channel.send({ embeds: [embed] })
    }
    if(args[0] === 'coins'){

        let data = await User.find()
    data = data.slice(0, 10);

    const rankUser = data.findIndex(dataUser => dataUser.userId === usMention.id)

        const embed = new EmbedBuilder()
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setDescription(`**${usUser.nick}** is in the **${rankUser}** position\nspeaking about \`coins\`!`)
        .setThumbnail(usUser.avatar)
            
        message.channel.send({ embeds: [embed] })
    }
  },
};
