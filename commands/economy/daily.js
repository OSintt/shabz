const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'daily',
    decription: 'With this command can u work!',
    cooldown: 86400000 ,
    run: async (client, message, args) => {

        const data = await User.findOne({ userId: message.author.id })
        if(!data) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("You're no registered!")
                .setColor('#FF0000')
            ]
        })


        const workd = new EmbedBuilder()
        .setDescription(`You received ur daily reward!`)
        await message.channel.send({
            embeds:[workd]
        })

        await User.findOneAndUpdate({ userId: message.author.id }, { cash: data.cash + Number(1000)})
    }
}