const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { hershell, error } = require("../lib/utils");
module.exports = {
  name: "set",
  decription: "You can see the leaderboard",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;
    try {
    dato = args[0];
    let data;
    const getTop = {
      nick: async () => (data = await User.find({ userId: usExists.id })),
      def: () => (data = null),
    };
    await (getTop[dato] || getTop["def"])();
    if (!data)
      return error(
        message,
        "__**Usage:**__:\n`6set <nick | avatar | emoji | bio | color | prefix>`"
      );

      usExists.nick = args.slice(1).join(' ')
      await usExists.save();

      message.reply({ content: `${usExists.nick}` })
    } catch(e) {
        return error(message, e.message)
    }
  },
};