const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const star = require("star-labs");
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'pat',
    description: 'With this command can u pats!',
    auth: true,
    cooldown: 3000,
    run: async (client, message, args, usExists) =>{
        const usMention = message.mentions.members.first()
        if(!usMention) return error(message, 'Forgot mentioned an user!')
        const usUser = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usUser) return error(message, 'Try 6 register first!')

        usUser.pats = usUser.pats + 1;
        await usExists.save();

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** stroked to **${usMention.user.username}**\n${usMention.user.username} has received ${usUser.pats} pat in total `)
            .setImage(star.pat())
        ]})
    }
}