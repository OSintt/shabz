const { Client, EmbedBuilder, Collection } = require("discord.js");
const { config } = require("dotenv");
const Discord = require("discord.js");
const client = new Client({ intents: [3276799] });
const fs = require("fs");
const ms = require("ms");
const Time = new Discord.Collection();
const xpdown = new Set();

require("./conexion");

config();

const User = require("./Schema/user");

client.commands = new Collection();

const commandFolder = fs.readdirSync("./commands");

for (const folder of commandFolder) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`);

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.on("messageCreate", async (message) => {
  const usExists = await User.findOne({ userId: message.author.id });

  if (usExists && usExists.afk.afk) {
    usExists.afk.afk = false;
    await usExists.save();
    message.channel.send({
      content: `Welcome back ${message.author.tag}, ur AFK status has been removed.`,
    });
  }

  if (message.mentions.members.first()) {
    const mentioned = await User.findOne({
      userId: message.mentions.members.first().id,
    });
    if (mentioned && mentioned.afk.afk) {
      message.channel.send({
        embeds: [
          new EmbedBuilder().setDescription(
            `**${mentioned.nick}** is currently AFK!\n**Reason:** ${mentioned.afk.reason}`
          ),
        ],
      });
    }
  }

  const prefix = "6";
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();
  const cmd = client.commands.get(command);
  if (cmd) {
    const usExists = await User.findOne({ userId: message.author.id });
    if (usExists) {
      if (xpdown.has(message.author.id)) return;
      let xplist = [15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 29, 30, 35];
      xp = Math.floor(Math.random() * xplist.length);
      usExists.xp = usExists.xp + xp;
      xpdown.add(message.author.id);
      setTimeout(() => {
        xpdown.delete(message.author.id);
      }, 4000);
    }
    if (cmd.cooldown) {
      if (Time.has(`${cmd.name}${message.author.id}`))
        return message.channel.send(
          `Don't get anxious! Come back in ${ms(
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
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("You are not registered yet!")
            .setColor("FF0000"),
        ],
      });
    return cmd.run(client, message, args, usExists);
  }
});

client.login(process.env.TOKEN);
console.log(`Ready!`);
