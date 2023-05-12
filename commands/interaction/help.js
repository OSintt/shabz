const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const { error, us, success } = require("../lib/utils")

module.exports = {
    name: 'help',
    description: 'pene',
    auth: true,
    cooldown: 5000,
    run: async (client, message, args, usExists) => {

        args = args[0]
        let data;
        const getCmds = {
            register: async () => (data = success(message, "With this command you can register.\n Usage: **6register**")),
            profile: async () => (data = success(message, "With this command show ur profile or the others users.\n Usage: **6profile [me or user]**")),
            'nick-set': async () => (data = success(message, "With this command can u edit the nick of ur profile.\n Usage: **6nick-set [nick]**")),
            'bio-set': async () => (data = success(message, "With this command can u edit the biografia of ur profile.\n Usage: **6bio-set **[description]**")),
            'emoji-set': async () => (data = success(message, "With this command can u edit the emoji of ur profile\n Usage: **6emoji-set [emoji]**")),
            'avatar-set': async () => (data = success(message, "With this command can u edit the avatar of ur profile.\n Usage: **6image-set [attachment]**")),
            'color-set': async () => (data = success(message, "With this command can u edit the color of ur profile.\n Usage: **6color-set [color]**")),
            'prefix-set': async () => (data = success(message, "With this command can u edit the prefix of ur profile.\n Usage: **6prefix-set [prefix]**")),
            pija: async () => (data = success(message, "With this command can u see ur dick or the others users!\n Usage: **6pija [me or user]")),
            changePija: async () => (data = success(message, "With this command can u edit the dick!")),
            rank: async () => (data = success(message, "With this command can u see your rank!\n Usage: **6rank [xp | rep | coins]**")),
            marry: async () => (data = success(message, "With this command can u married to persona!\n Usage: **6marry [user]")),
            divorce: async () => (data = success(message, "With this command can u divorce!")),
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