const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
module.exports = {
    name: 'register',
    decription: 'With this command can u register!',
    run: async (client, message, args) => {

        const data = await User.findOne({ userId: message.author.id })
        if(data) return message.reply({
            embeds:[
                new EmbedBuilder()
                .setDescription("You're alredy register!")
            ]
        })
        if(!data){
            const nuevo = new User({
                userId: message.author.id,
                nick: message.author.username,
                avatar: message.author.displayAvatarURL({ dynamic: true }),
            })
            await nuevo.save();
            return message.channel.send({ content: 'Creating profile, wait moment...'})
        }
    }
}