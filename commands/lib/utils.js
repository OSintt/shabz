const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const dayjs = require("dayjs");

const error = (message, msg) => {
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor("FF0000")],
  });
};

const success = async (message, msg, usExists) => {
  usExists = await User.findOne({ userId: message.author.id });
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor(usExists.color)],
  });
};

const checkInt = (coins, text, args) => {
  if (args.length === 0)
    throw new Error(`You forgot to enter how much you want to ${text}!`);
  args = args[0].replace(/`/g, "");
  if (!args)
    throw new Error(`You forgot to enter how much you want to ${text}!`);
  if (args.toLowerCase() === "all") {
    args = coins;
  }
  if (isNaN(args)) throw new Error(`\`${args}\` is not a valid value!`);
  if (args <= 0) throw new Error("Don't even try it!");
  if (coins < args) throw new Error(`Don't try to ${text} more than you have!`);
  return Math.round(parseInt(args));
};

const getProfile = async (message, userId, guild, mention) => {
  const user = await User.findOne({ userId });
  const marr = user.married.map((k) => k.nick).join("\n");
  if (!mention) {
    mention = message.author;
  }
    return (
      new EmbedBuilder()
        .setAuthor({
          name: mention.tag,
          iconURL: mention.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(
          user.avatar ? user.avatar : mention.displayAvatarURL({ dynamic: true })
        )
        .setColor(user.color)
        .setDescription(
          `||${user.emoji}|| **Nick:** \`${user.nick}\` **Rep:** \`${
            user.rep
          }\`\n||${user.emoji}|| **Coins:** \`${
            user.cash + user.bank
          }\` **Items:** \`${guild.inventory.length}\`**Xp:** \`${user.xp}\`\n||${
            user.emoji
          }|| **Hugs:** \`${user.hugs}\` **Pats:** \`${user.pats}\`\n||${
            user.emoji
          }|| **${
            user.married.length === 0
              ? "**Edater:**"
              : user.married.length === 1
              ? "**Edater:**"
              : "**Edaters:**"
          }** \`${
            marr.length === 0
              ? "Single!"
              : user.married.length > 1
              ? marr.slice(0, 20) + "..."
              : marr
          }\`\n**Bio:** \`\`\`${user.bio}\`\`\`
              `
        )
        // .addFields({
        //   name: `||${user.emoji}|| Nick`,
        //   value: `\`${user.nick}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Rep`,
        //   value: `\`${user.rep}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Coins`,
        //   value: `\`${user.cash + user.bank}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Items`,
        //   value: `\`${guild.inventory.length}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Xp`,
        //   value: `\`${user.xp}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Hugs`,
        //   value: `\`${user.hugs}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Pats`,
        //   value: `\`${user.pats}\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| ${user.married.length === 0 ? "Edater" : user.married.length === 1 ? "Edater" : "Edaters" }`,
        //   value: `\`${marr.length === 0 ? "Single!" : marr }\``,
        //   inline: true
        // },
        // {
        //   name: `||${user.emoji}|| Bio`,
        //   value: `\`\`\`${user.bio}\`\`\``,
        // })
        .setFooter({
          text: `Member since ${dayjs(user.birthday).format("D/M/YY - h:mma")}`,
        })
    );
};
const hershell = "793161028988960798";
module.exports = { hershell, error, success, getProfile, checkInt };

// ${marry ? marry.nick : "Single!"}
