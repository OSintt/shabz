const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us } = require("../lib/utils");

module.exports = {
    name: 'hug',
    description: 'With this command u can hugs!',
    auth: true,
    cooldown: 3000,
    run: async (client, message, args) =>{
    

        const usMention = message.mentions.members.first()
        if(!usMention) return error(message, 'Forgot mentioned an user!')
        const usExists = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usExists) return error(message, 'Try 6 register first!')    

        usExists.hugs = usExists.hugs + 1;
        await usExists.save();

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** has a hugger to **${usMention.user.username}**\n*${usMention.user.username}* has received *${usExists.hugs}* hug in total `)
            .setImage(star.hug())
        ]})
    }
}