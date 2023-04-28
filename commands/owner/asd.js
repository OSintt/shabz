const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
module.exports = {
  name: "asd",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {
    if(message.author.id !== hershell) return;

    message.guild.channels.create({
        name: args[0],
    }).then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000)
    })

    console.log(`Channel created! `)

  },
};