const { EmbedBuilder } = require("discord.js")
const User = require("../../Schema/user")
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'divorce',
    description: 'With this command can u divorce!',
    auth: true,
    run: async (client, message, args, usExists) => {

        const usProfile = await User.findOne({ userId: message.author.id })
        if(!usProfile.marry) return error(message, "You're no married!")

        const usUser = await User.findOne({ userId: usProfile.marry })

        const embed = new EmbedBuilder()
        .setDescription(`Are you sure want to get divorce from **${usUser.nick}?** **[yes/no]**`)
        message.channel.send({ embeds:[embed]})

        const collector = message.channel.createMessageCollector(m => m.author.id === m.author.id && m.channel.id === message.channel.id, { time: 9000 });

        collector.on("collect", async collected => {
            if(collected.content === "yes"){
                usExists.marry = "";
                usUser.marry = "";
                await usExists.save();
                await usUser.save();

                return message.channel.send({ content: ':c'})
                collector.stop();
            } else if(collected.content === "no"){
                message.channel.send({ embeds:[
                    new EmbedBuilder()
                    .setDescription("you made a good decision")
                ]})
                collector.stop();
            }
        })
        collector.on("end", async collected => {
            if(collected.size === 0) return error(message, 'Time is over...')
            return collector.stop();
        })
    }
}