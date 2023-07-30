const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const { error, us, success } = require("../lib/utils")

module.exports = {
    name: 'help',
    description: 'pene',
    cooldown: 5000,
    auth: true,
    run: async (client, message, args, usExists) => {

        args = args[0]
        let data;
        const getCmds = {
            def: () => (data = null),
        };
        await (getCmds[args] || getCmds["def"])();
        if(!data) return message.reply({ embeds: [
            new EmbedBuilder()
            .setDescription(`Hi **${message.author.username}** I'm **${client.user.username}**, just another average ${message.guild.name} bot`)
            .setFields({
                name: '<a:shb_em3_putas:1099847960180838514> Profile', 
                value: '`register` `profile` `nick-set` `bio-set` `emoji-set` `image-set` `color-set` `prefix-set` `pija` `changePija` `rank` `marry` `divorce`',
            },
            {
                name: '<a:shb_em3_putas:1099847960180838514> Economy',
                value: '`work` `daily` `crime` `slut` `dep` `with` `pay` `rep` `rob` `hen` `shop` `buy` `use`',
            },
            {
                name: '<a:shb_em3_putas:1099847960180838514> Leaderboard',
                value: '`top`'
            },
            {
                name: '<a:shb_em3_putas:1099847960180838514> Interaction',
                value: '`hug` `pat`',
            })
            .setColor(usExists.color ? usExists.color : "7900386")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
        ]})
    }
}