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
    const avatars = [
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740517589336136/pfp-aesthetic-dark-anime-girl-1001x1024.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740556185305118/images.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740581141434408/images.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740634971115661/7c805e63b9f82ceefa51ae0c4f19b23c.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740660573163640/99e6fe4485ebf4077770323dec4905aa.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740690122027109/original.png",
      "https://cdn.discordapp.com/attachments/1093910426024149123/1099740744312426516/f3707212b451bb7e2fd90f8bbb98fad8.png"
    ];
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    const nuevo = new User({
      userId: message.author.id,
      nick: message.author.username,
      avatar,
      servers: [
        {
          server: server._id,
          inventory: [],
        },
      ],
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
            embeds: [
              await getProfile(message, message.author.id, nuevo.servers[0]),
            ],
          });
        }, 1000);
      });
  },
};
