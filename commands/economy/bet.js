const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, us, checkInt, success, hershell } = require("../lib/utils");
const cooldow = [];

module.exports = {
  name: "bet",
  description: "pene",
  auth: true,
  run: async (client, message, args, usExists) => {
    try {
      if (cooldow.includes(message.author.id))
        return error(message, "You already in cooldown for 2 minutes!");

      const Myd = ["✌️", "👊", "🤚"];

      const bot = Myd[Math.floor(Math.random() * Myd.length)];
      const user = Myd[Math.floor(Math.random() * Myd.length)];

      args[0] = checkInt(usExists.cash, "bet", args);

      if (usExists.cash < args[0])
        return error(message, "Don't try to bet more than you have!");

      if (bot === user) {
        success(message, `Empate`);
      } else if (user === "✌️" && bot === "👊") {
        usExists.cash -= args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor("FF0000"),
          ],
        });
      } else if (user === "✌️" && bot === "🤚") {
        usExists.cash += args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor(usExists.color),
          ],
        });
      } else if (user === "👊" && bot === "🤚") {
        usExists.cash -= args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor("FF0000"),
          ],
        });
      } else if (user === "👊" && bot === "✌️") {
        usExists.cash += args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor(usExists.color),
          ],
        });
      } else if (user === "🤚" && bot === "👊") {
        usExists.cash += args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor(usExists.color),
          ],
        });
      } else if (user === "👊" && bot === "✌️") {
        usExists.cash += args[0];
        await usExists.save();

        message.reply({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
              })
              .setFields(
                {
                  name: "I'm",
                  value: `\`${bot}\``,
                  inline: true,
                },
                {
                  name: "You",
                  value: `\`${user}\``,
                  inline: true,
                }
              )
              .setColor(usExists.color),
          ],
        });
      }
      cooldow.push(message.author.id);
      setTimeout(() => {
        cooldow.shift();
      }, 120000);
    } catch (e) {
      return error(message, e.message);
    }
  },
};
