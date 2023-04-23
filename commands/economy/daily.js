const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");

module.exports = {
  name: "daily",
  description: "With this command u can your daily reward!",
  auth: true,
  cooldown: 86400000,
  run: async (client, message, args, usExists) => {
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { cash: usExists.cash + 1000 }
    );
    return error(message, 'You received your `1000` daily coins! Keep working for more!');
  },
};