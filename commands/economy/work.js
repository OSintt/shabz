const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'work',
    decription: 'With this command can u work!',
    cooldown: 3000  * 100,
    run: async (client, message, args) => {

        const data = await User.findOne({ userId: message.author.id })
        if(!data) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("You're no registered!")
                .setColor('#FF0000')
            ]
        })

        const random = Math.floor(Math.random() * 500) + 100

        const workd = new EmbedBuilder()
        .setDescription(`You worked and earn **${random}** coins!`)
        .setColor('#020202')
        await message.channel.send({
            embeds:[workd]
        })
        await User.findOneAndUpdate({ userId: message.author.id }, { cash: data.cash + Number(random)})
    }
}