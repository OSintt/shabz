const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
module.exports = {
  name: "asd",
  description: "With this command can u register!",
  auth: true,
  run: async (client, message, args, usExists) => {

    try {
    if(message.author.id !== hershell) return;

    message.guild.channels.create("pene", {
        type: 'text',
    }).then(m => {
        m.send("asd")
    })
} catch(e) {
    return error(message, e.message)
}
  },
};