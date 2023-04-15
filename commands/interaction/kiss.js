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
        const usProfile = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usProfile) return error(message, 'This user is not registered yet!')
        
        if(usMention === message.author) return error(message, 'Nope')

        let kiss = usExists;
        const user = usProfile;
        kiss.kiss = message.author.id;
        user.kiss = message.mentions.users.first().id;

        const objeto = {
            userId: user.kiss,
            userKiss: usExists.kiss + 1
        }

        const objeto2 = {
            userId: message.author.id
        }

        usProfile.kiss.push(objeto2)
        usExists.kiss.push(objeto)
        await usExists.save();
        await usProfile.save();

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** kiss to **${usMention.username}**\n${usMention.username} and ${message.author.username} ${usExists.kiss} kiss in total `)
            .setImage(star.kiss())
        ]})
    }
}