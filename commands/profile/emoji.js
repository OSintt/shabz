const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us} = require("../lib/utils");
module.exports = {
  name: "emoji-set",
  description: "You forgot to put u emote!",
  auth: true,
  run: async (client, message, args, usExists) => {

    const usEmoji = args[0]
    if(!usEmoji) return message.channel.send({ embeds: [
      new EmbedBuilder()
      .setDescription('You forgot to put your emoji!')
      .setFooter({ text: 'Remember that the emoji must be on my server!'})
      .setColor('FF0000')
    ]})

    const guEmoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
    if(!guEmoji) return message.channel.send({ embeds: [
      new EmbedBuilder()
      .setDescription('That emoji is not on the server!')
      .setFooter({ text: 'Remember that the emoji must be on my server!'})
      .setColor('FF0000')
    ]})

    const user = usExists.marry
    const marry = await User.findOne({ userId: user })

    usExists.emoji = args[0]
    await usExists.save();

    message.channel.send({ content: `Editing the emojis of ur profile to ${usEmoji}...`}).then(r => {
        setTimeout(() => {
            r.edit({ embeds:[
                new EmbedBuilder()
                .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
                .setColor('#00ff00')
                .setFields(
                {
                  name: `${usExists.emoji} Name`,
                  value: `\`${usExists.nick}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Rep`,
                  value: `\`${usExists.rep}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Coins`,
                  value: `\`${usExists.cash + usExists.bank}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Items`,
                  value: `\`${usExists.items}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Xp`,
                  value: `\`${usExists.xp}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Hugs`,
                  value: `\`${usExists.hugs}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Pats`,
                  value: `\`${usExists.pats}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Language`,
                  value: `\`${usExists.Language}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Married`,
                  value: `\`${marry ? marry.nick : "Single!"}\``,
                  inline: true
                },
                {
                  name: `${usExists.emoji} Bio`,
                  value: `\`\`\`${usExists.bio}\`\`\``
                })
                .setTimestamp()
              ]})
            }, 3000)
          })
        },
      };
