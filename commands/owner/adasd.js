const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us} = require("../lib/utils");
module.exports = {
  name: "ads",
  run: async (client, message, args, usExists) => {

    if(message.author.id !== '982390723716476928') return;

    client.user.setAvatar('https://cdn.discordapp.com/attachments/1093910619318669363/1114071046518214786/3b2b08cb7edcc15442433c4e9fbbdafe.jpg')

  },
};  