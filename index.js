const { Client, EmbedBuilder, Collection } = require("discord.js");
const { config } = require("dotenv");
const Discord = require("discord.js");
const client = new Client({ intents: [3276799] });
const fs = require("fs");
const ms = require("ms");
const xpdown = new Set();

const Time = new Discord.Collection();

require("./conexion");

config();

const Server = require("./Schema/server");
const User = require("./Schema/user");
const { error } = require("./commands/lib/utils");

client.commands = new Collection();

const commandFolder = fs.readdirSync("./commands");

for (const folder of commandFolder) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`);

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.on("ready", () => {
  client.user.setPresence({
    status: "dnd",
    game: {
      name: "discord.gg/peru",
      type: "WATCHING",
    },
  });
});

client.on("messageCreate", async (message) => {
  const usExists = await User.findOne({ userId: message.author.id }).populate(
    "servers"
  );
  if (message.mentions.members.first()) {
    const mentioned = await User.findOne({
      userId: message.mentions.members.first().id,
    });
    if (mentioned && mentioned.afk.afk) {
      const embed =
        usExists.Language === "Spanish"
          ? new EmbedBuilder().setDescription(
              `**${mentioned.nick}** está actualmente AFK!\n**Razón:** ${mentioned.afk.reason}`
            )
          : new EmbedBuilder().setDescription(
              `**${mentioned.nick}** is currently AFK!\n**Reason:** ${mentioned.afk.reason}`
            );

      await message.reply({ embeds: [embed] });
    }
  }

  const prefix = "6";
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift();
  const cmd = client.commands.get(command);
  let guild;
  if (cmd) {
    if (usExists) {
      const server = await Server.findOne({ guildId: message.guild.id });
      if (!server) {
        await Server.create({
          guildId: message.guild.id,
        });
      }
      if (!usExists.servers.includes(server._id)) {
        usExists.servers.push({ server: server._id, inventory: [] });
      }
      guild = usExists.servers.find((s) => s.server === server._id);
      if (usExists.afk.afk) {
        const msg =
          usExists.Language === "Spanish"
            ? `Bienvenido de vuelta **${message.author.tag}**, tu estado AFK se ha eliminado`
            : `Welcome back **${message.author.tag}**, ur AFK status has been removed!`;
        usExists.afk.afk = false;
        await usExists.save();
        message.reply({
          content: msg,
        });
      }
      if (!xpdown.has(message.author.id)) {
        const xp = Math.round(Math.random() * 35);
        usExists.xp += xp;
        await usExists.save();
        xpdown.add(message.author.id);
        setTimeout(() => {
          xpdown.delete(message.author.id);
        }, 4000);
      }
      if (cmd.cooldown) {
        if (Time.has(`${cmd.name}${message.author.id}`))
          return error(
            message,
            `You used this command so recently! Come back in ${ms(
              Time.get(`${cmd.name}${message.author.id}`) - Date.now(),
              { long: false }
            )}`
          );
        Time.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown);
        setTimeout(() => {
          Time.delete(`${cmd.name}${message.author.id}`);
        }, cmd.cooldown);
      }
      if (cmd.auth && !usExists)
        return error(message, "You are not registered yet!");
      return cmd.run(client, message, args, usExists, guild);
    }
  }
});

client.login(process.env.TOKEN);
console.log(`Ready!`);
