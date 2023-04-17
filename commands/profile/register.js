const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const Server = require("../../Schema/server");
const { error, getProfile } = require("../lib/utils");
module.exports = {
  name: "register",
  description: "With this command can u register!",
  run: async (client, message, args, usExists, guild) => {
    if (usExists) return error(message, "You're alredy registered!");
    const server = await Server.findOne({ guildId: message.guild.id });
    const pija = Math.round(Math.random() * 39);
    const nuevo = new User({
      userId: message.author.id,
      nick: message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
      servers: [{
        server: server._id,
        inventory: []
      }],
      pija,
    });
    await nuevo.save();
    return message.channel
      .send({
        embeds: [
          new EmbedBuilder().setDescription(
            "Creating profile, wait a moment..."
          ),
        ],
      })
      .then((r) => {
        setTimeout(async () => {
          r.edit({
            embeds: [await getProfile(message, message.author.id, nuevo.servers[0])],
          });
        }, 1500);
      });
  },
};
