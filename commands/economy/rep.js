const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success } = require("../lib/utils");

module.exports = {
  name: "rep",
  description: "With this command u can paid rep to users!",
  auth: true,
  mention: true,
  cooldown: 86400000,
  run: async (client, message, args, usExists) => {
    const usMention = message.mentions.members.first();

    const usUser = await User.findOne({ userId: usMention.id });
    if (!usUser) return error(message, "This user is not registed yet!");

    if (usMention.id === message.author.id) return error(message, "Nope!");

    usUser.rep = usUser.rep + 1;
    await usUser.save();

    return success(
      message,
      `You just have given \`1\` rep to **${usMention.username}**`
    );
  },
};
