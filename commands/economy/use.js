const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, success } = require("../lib/utils");

module.exports = {
  name: "use",
  description: "With this command u can take-out money!",
  auth: true,
  cooldown: 2000,
  run: async (client, message, args, usExists) => {
    try {
      if (message.author.id !== hershell) return error(message, "Hey! >:c");

      args = args[0];
      if (!args) return error(message, "Missing Arguments!");

      if (args === "slot") {
        usExists.married.push({
          slots: +1,
          maxSlots: +1,
        });
        await usExists.save();
      }

      const item = usExists.items.find((k) => k.name === args);
      if (!item) return error(message, "You no've this item!");

      success(message, "oki");
    } catch (e) {
      return error(message, e.message);
    }
  },
};
