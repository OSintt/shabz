const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const star = require("star-labs");
const { error, us, hershell } = require("../lib/utils")

module.exports = {
    name: 'kiss',
    description: 'With this command u can kiss!',
    cooldown: 4000,
    auth: true,
    run: async (client, message, args, usExists) => {

        if(message.author.id !== hershell) return;

        const usMention = message.mentions.users.first()
        if(!usMention) return error(message, 'Forgot mentioned an user!')
        const usUser = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usUser) return error(message, 'This user is not registered yet!')
        
        if(usMention === message.author) return error(message, 'Nope')

        let ks = usUser;
        const user = usExists;
        marry.marry = message.author.id;
        user.marry = message.mentions.users.first().id;

        usExists.kiss = {
            userId: usMention.id,
            kisses: usUser.kiss.kisses + 1
        }
        await usExists.save();

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** kiss to **${usMention.username}**\n${usMention.username} and ${message.author.username} ${usUser.kiss.kisses} pat in total `)
            .setImage(star.kiss())
        ]})
    }
}   