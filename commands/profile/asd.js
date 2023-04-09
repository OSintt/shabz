const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "asd",
  decription: "With this command can u register!",
  run: async (client, message, args) => {
    message.channel.send({
      embeds:[new EmbedBuilder().setDescription('Creating profile, wait a moment...')]
    }).then(r => {
        setTimeout(() => {
            r.edit({ embeds:[
                new EmbedBuilder()
                .setDescription("asd")
            ]})
            }, 3000)
    })
  },
};
