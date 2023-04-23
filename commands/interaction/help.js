const { EmbedBuilder } = require("discord.js")
const User = require('../../Schema/user')
const { error, us } = require("../lib/utils")

module.exports = {
    name: 'help',
    description: 'pene',
    cooldown: 5000,
    run: async (client, message, args, usExists) => {

        const asd = args[0]
        if(!asd) return message.channel.send({ embeds: [
            new EmbedBuilder()
            .setDescription(`Hi **${message.author.username}** I'm **${client.user.username}**, just another average ${message.guild.name} bot`)
            .setFields({
                name: 'Profile', 
                value: '`register` `profile` `nick-set` `bio-set` `emoji-set` `image-set` `pija` `change-pija` `rank`',
            },
            {
                name: 'Economy',
                value: '`work` `daily` `collect-income` `crime` `dep` `with` `pay` `rep` `rob`',
            },
            {
                name: 'Leaderboard',
                value: '`top` `top-cash` `top-bank` `top-rep` `top-xp`'
            },
            {
                name: 'Interaction',
                value: '`hug` `pat`',
            })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
        ]})
        if(asd === 'register'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``
                },
                {
                    name: 'Information',
                    value: 'With this command you can register.'
                },
                {
                    name: 'Usage',
                    value: '6register `[Sign up and create a profile]`'
                })
            ]})
        } else if(asd === 'profile'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command show ur profile or the others users.',
                },
                {
                    name: 'Usage',
                    value: '`6profile [user]`',
                },
                {
                    name: 'Examples',
                    value: '6profile `[Show ur profile]`\n6profile @user `[Show profile the user]`',
                })
                .setFooter({ text: 'Sintax: <required> [optional]' })
            ]})
        } else if(asd === 'nick-set'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u edit the nick of ur profile',
                },
                {
                    name: 'Usage',
                    value: '`6nick-set [args]`',
                },
                {
                    name: 'Example',
                    value: '6nick-set nick`[Edit the nick of ur profile]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'bio-set'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u edit the biografia of ur profile',
                },
                {
                    name: 'Usage',
                    value: '`6bio-set [args]`',
                },
                {
                    name: 'Example',
                    value: '6bio-set bio`[Edit the biografia of ur profile]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'emoji-set'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u edit the emoji of ur profile',
                },
                {
                    name: 'Usage',
                    value: '`6emoji-set [emoji]`',
                },
                {
                    name: 'Example',
                    value: '6emoji-set <a:keeodbailando:1094283156527521853>`[Edit the emojis of ur profile]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'image-set'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u edit the avatar of ur profile',
                },
                {
                    name: 'Usage',
                    value: '`6image-set [attachment]`',
                },
                {
                    name: 'Example',
                    value: '6image-set `[Edit the avatar of ur profile]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'pija'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u see ur dick or the others users',
                },
                {
                    name: 'Usage',
                    value: '`6pija [user]`',
                },
                {
                    name: 'Example',
                    value: '6pija`[See the dicks u or the others users]`',
                })
                .setFooter({ text: 'Sintax: <required> [optional]' })
            ]})
        } else if(asd === 'change-pija'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u edit the dick',
                },
                {
                    name: 'Usage',
                    value: '`chage-pija`',
                },
                {
                    name: 'Example',
                    value: '6change-pija `[Edit the dick of ur]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'work'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u will work',
                },
                {
                    name: 'Usage',
                    value: '`6work`',
                },
                {
                    name: 'Example',
                    value: '6work `You earn money with this command]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'daily'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u claim ur reward daily',
                },
                {
                    name: 'Usage',
                    value: '`6daily`',
                },
                {
                    name: 'Example',
                    value: '6daily `[You claim reward daily]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'crime'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u will commit a crime',
                },
                {
                    name: 'Usage',
                    value: '`6crime`',
                },
                {
                    name: 'Example',
                    value: '6crime `[You win and lose by commit a crime]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'dep'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u deposit ur money',
                },
                {
                    name: 'Usage',
                    value: '`take-out [all or amount]`',
                },
                {
                    name: 'Example',
                    value: '6dep all `[You deposit all money the wallet]`\n6dep [amount] `[You deposit amount of money the wallet]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'take-out'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u take-out ur money',
                },
                {
                    name: 'Usage',
                    value: '`6take-out [all or amount]`',
                },
                {
                    name: 'Example',
                    value: '6take-out all `[You take-out all money the bank]`\n6dep [amount] `[You take-out amount of money the bank]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'pay'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command can u paid an user',
                },
                {
                    name: 'Usage',
                    value: '`6pay [user] [all or amount]`',
                },
                {
                    name: 'Example',
                    value: '6pay all `[You pay all money an user]`\n6pay [amount] `[You pay amount of money an user]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'rep'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',    
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command can u give rep an user',
                },
                {
                    name: 'Usage',
                    value: '`6rep [user]`',
                },
                {
                    name: 'Example',
                    value: '6rep [user] `[You give 1 reputation an user]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})     
        } else if(asd === 'rob'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command can u robbed an user',
                },
                {
                    name: 'Usage',
                    value: '`6rob [user]`',
                },
                {
                    name: 'Example',
                    value: '6rob [user] `[You robbed an user]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'hug'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u can hug an user',
                },
                {
                    name: 'Usage',
                    value: '`6hug [user]`',
                },
                {
                    name: 'Example',
                    value: '6hug [user] `[You can hug a user]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        } else if(asd === 'pat'){
            message.channel.send({ embeds: [
                new EmbedBuilder()
                .setAuthor({
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL()
                })
                .setFields({
                    name: 'Command',
                    value: `Information the command: \`${asd}\``,
                },
                {
                    name: 'Information',
                    value: 'With this command u can pat an user',
                },
                {
                    name: 'Usage',
                    value: '`6pat [user]`',
                },
                {
                    name: 'Example',
                    value: '6pat [user] `[You can pat a user]`',
                })
                .setFooter({ text: 'Sintax: <required>' })
            ]})
        }
    }
}