const User = require("../../Schema/user");
const { error, us } = require("../lib/utils");
module.exports = {
  name: "register",
  decription: "With this command can u register!",
  run: async (client, message, args) => {
    if (await us(message)) return error(message, "You're alredy registered!");
    const nuevo = new User({
      userId: message.author.id,
      nick: message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true }),
    });
    await nuevo.save();
    return message.channel.send({
      content: "Creating profile, wait moment...",
    });
  },
};
