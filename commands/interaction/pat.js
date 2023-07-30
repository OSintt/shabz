const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const star = require("star-labs");
const { error, us } = require("../lib/utils");

module.exports = {
    name: 'pat',
    description: 'With this command can u pats!',
    auth: true,
    cooldown: 3000,
    run: async (client, message, args, usExists) =>{
        try {
        const usMention = message.mentions.members.first()
        if(!usMention) return error(message, 'Forgot mentioned an user!')
        const usUser = await User.findOne({ userId: message.mentions.members.first().id })
        if(!usUser) return error(message, 'Try 6 register first!')

        if(usMention.id === message.author.id) return error(message, "Nope")

        usUser.pats = usUser.pats + 1;
        await usUser.save();

        message.reply({ embeds:[
            new EmbedBuilder()
            .setDescription(`**${message.author.username}** stroked to **${usMention.user.username}**\n**_${usMention.user.username}**_ has received **_${usUser.pats}**_ pat in total `)
            .setImage(star.pat())
        ]})
        } catch(e) {
            return error(message, e.message)
        }
    }
}