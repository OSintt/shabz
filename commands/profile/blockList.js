const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, success, hershell } = require("../lib/utils");
module.exports = {
  name: "blocklist",
  description: "You forgot to put u nicknamee",
  auth: true,
  cooldown: 3000,
  run: async (client, message, args, usExists) => {
    try {
      if (message.author.id !== hershell) return error(message, "Hey! >:c");

      const asd =
        usExists.blockeds
          .map(
            (x) => ` \`${usExists.blockeds.length}\`${x.nick} (<@${x.userId}>)`
          )
          .join("\n") || "Nope";

      console.log(usExists);

      const embed = new EmbedBuilder()

        .setAuthor({
          name: message.author.tag,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTitle("Block List!")
        .setDescription(`${asd}`)
        .setColor(usExists.color)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (e) {
      return error(message, e.message);
    }
  },
};
