const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'profile',
    decription: 'With command can see u profile',
    run: async (client, message, args) => {

        const user = message.mentions.users.first() || message.author;

        let data = await User.findOne({ userId: user.id })
        if(!data) return console.log("No registered")

        const asd = data.marry
    const pp = await User.findOne({ userId: asd });

        const profile = new EmbedBuilder()

        .setAuthor({ name: user.tag, url: user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(data.avatar)
        .setFields({
            name: `${data.emoji} Nick`, value: `\`${data.nick}\``, inline: true
        },
        {
            name: "Rep", value: `\`${data.rep}\``, inline: true
        },
        {
            name: "Coins", value: `\`${data.cash + data.bank}\``, inline: true
        },
        {
            name: "Xp", value: `\`${data.xp}\``, inline: true
        },
        {
            name: "Items", value: `\`${data.items}\``, inline: true
        },
        {
            name: "Married", value: `\`${pp ? pp.nick : "Single!"}\``, inline: true
        },
        {
            name: "Biografia", value: `\`\`\`${data.bio}\`\`\``, inline: true
        })

        await message.channel.send({
            embeds:[profile]
        })
        
        
    }
}