const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "marry",
  decription: "With this command can u register!",
  run: async (client, message, args) => {

    const pene = args[0]
    if(!pene) return error(message, 'forgot qsy')

    message.channel.send({ content: `and `})
  },
};
