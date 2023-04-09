const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'work',
    decription: 'With this command can see leadeboard',
    cooldown: 3000  * 100,
    run: async (client, message, args) => {

        const pene = await User.findOne({ userId: message.author.id })
    let data = await User.find().sort({ coins: -1 })
    asd = data.slice(0, 10);
    if (!data) return message.channel.send({
        embeds:[
            new EmbedBuilder()
            .setDescription('Nothing to see here yet.')
        ]
    })

    const top = asd.map((dato, i) => `${pene.emoji} **${i === 0 ? "1" : i + 1} •** ${dato.nick} | **Coins:** \`${dato.cash + dato.bank}\``)

        const lb = new EmbedBuilder()

        .setTitle('Leadeboard!')
        .setDescription(await top)

        message.channel.send({
            embeds:[lb]
        })
    }
}