const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const star = require("star-labs");
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'pat',
    description: 'With this command can u pats!',
    cooldown: 4000,
    auth: true,
    run: async (client, message, args) =>{
        const usMention = message.mentions.members.first()
        if(!usMention) return error(message, 'Forgot mentioned an user!')
        const usExists = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usExists) return error(message, 'Try 6 register first!')

        usExists.pats = usExists.pats + 1;
        await usExists.save();

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** stroked to **${usMention.user.username}**\n${usMention.user.username} has received ${usExists.pats} pat in total `)
            .setImage(star.pat())
        ]})
    }
}   