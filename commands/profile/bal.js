const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'bal',
    decription: 'With command can see u bal',
    run: async (client, message, interaction, args) => {

        

        const user = message.mentions.members.first() || message.author;
        if(!user) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("Nope")
            ]
        })

        let data = await User.findOne({ userId: user.id })
        if(!data) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("This user not registered!")
                .setColor(FF0000)
            ]
        })

        const bal = new EmbedBuilder()

        .setAuthor({ name: user.tag, iconUrl: user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(data.avatar)
        .setDescription(`**${user.username}**'re current bal is: \`${data.cash + data.bank}\``)
        .setFields({
            name: `${data.emoji} Cash`, value: `\`${data.cash}\``, inline: true
        },
        {
            name: `${data.emoji} Bank`, value: `\`${data.bank}\``, inline: true
        },
        {
            name: `${data.emoji} All money`, value: `\`${data.cash + data.bank}\``, inline: true
        })

        await message.channel.send({
            embeds:[bal]
        })
        
        
    }
}