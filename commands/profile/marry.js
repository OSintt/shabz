const { EmbedBuilder } = require("discord.js")
const User = require("../../Schema/user")
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'marry',
    description: 'With this command cann u marriage!',
    auth: true,
    run: async (client, message, args) => {

        const usMention = message.mentions.members.first()
        if(!usMention) return error(message, 'You forgot to mention an user!')

        const usExists = await User.findOne({ userId: usMention.id })
        if(!usExists) return error(message, 'Try 6register!')

        if(usExists.marry) return error(message, "This user is already married!")

        const usProfile = await User.findOne({ userId: message.author.id })
        if(usProfile.marry) return error(message, "You already married!")

        if(usMention === message.author) return error(message, 'Nope')

        message.channel.send({ embeds:[
            new EmbedBuilder()
            .setDescription(`Now you have to wait for **${usMention.user.username}** acceptation to finish the marriage! **[yes/no]**`)
        ]})

        const collector = message.channel.createMessageCollector(m => m.author.id === usMention.id && m.channel.id === message.channel.id, { time: 30000 });

        collector.on("collect", async collected => {
            if(collected.content === "yes"){
            if(message.author.id !== usMention.id) return;

            let marry = usExists;
            const user = usProfile;
            marry.marry = message.author.id;
            user.marry = message.mentions.users.first().id;
            await marry.save();
            await user.save();

                const embed = new EmbedBuilder()

                .setDescription(`Congratulations on the marriage of **${marry.nick}** and **${user.nick}**`)
                message.channel.send({ embeds:[embed]})
                return collector.stop();
            } else if (collected.content === "no"){
                if(message.author.id !== usMention.id) return;
                return (message, `Well, **${usProfile.nick}** there will be more opportunities`)
                return collector.stop();
            }
        })
        collector.on("end", async collected => {
            if(collected.size === 0) return error(message, 'Well, it seems that it will be another time')
        })
    }
}