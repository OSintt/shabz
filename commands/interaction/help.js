const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'help',
    description: 'pene',
    run: async (client, message, args, usExists) => {

        const asd = args[0]
        if(!asd) return message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription(`Hi **${usExists.nick}** I'm **${client.user.username}**, just another average ${message.guild.name} bot`)
            .setFields({
                name: 'Profile', 
                value: '`register` `profile` `nick-set` `bio-set` `emoji-set` `image-set` `pija` `change-pija`',
            },
            {
                name: 'Economy',
                value: '`work` `daily` `collect-income` `crime` `dep` `with` `pay` `rep` `rob`',
            },
            {
                name: 'Interaction',
                value: '`hug` `pat`',
            })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
        ]})
    }
}