const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Afk = require("../../Schema/afk");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "asd",
  decription: "With this command can u register!",
  run: async (client, message, args) => {
    const data = await Afk.findOne({ userId: message.author.id })
    if(!data){
        const nuevo = new Afk({
            userId: message.author.id,
            reason: 'discord.gg/peru'
        })
        await nuevo.save();
        return message.channel.send({ embeds:[
            new EmbedBuilder()
            .setAuthor({ name: message.author.tag })
            .setTitle('Afk Established')
            .setDescription('**Reason:** discord.gg/peru')
            .setFooter({ text: 'I will notify those who mention u'})
        ]})
    }
  },
};
