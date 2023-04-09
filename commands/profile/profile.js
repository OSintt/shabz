const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'profile',
    decription: 'With command can see u profile',
    run: async (client, message, interaction, args) => {

        const user = message.mentions.members.first() || message.author;

        let data = await User.findOne({ userId: user.id })

        if(!data) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("This user not registered!")
                .setColor('#FF0000')
            ]
        })

        const asd = data.marry
    const pp = await User.findOne({ userId: asd });

        const profile = new EmbedBuilder()

        .setAuthor({ name: user.tag, iconUrl: user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(data.avatar)
        .setFields({
            name: `${data.emoji} Nick`, value: `\`${data.nick}\``, inline: true
        },
        {
            name: `${data.emoji} Rep`, value: `\`${data.rep}\``, inline: true
        },
        {
            name: `${data.emoji} Coins`, value: `\`${data.cash + data.bank}\``, inline: true
        },
        {
            name: `${data.emoji} Xp`, value: `\`${data.xp}\``, inline: true
        },
        {
            name: `${data.emoji} Items`, value: `\`${data.items}\``, inline: true
        },
        {
            name: `${data.emoji} Married`, value: `\`${pp ? pp.nick : "Single!"}\``, inline: true
        },
        {
            name: `Biografia`, value: `\`\`\`${data.bio}\`\`\``, inline: true
        })

        await message.channel.send({
            embeds:[profile]
        })
        
        
    }
}