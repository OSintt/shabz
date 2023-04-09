const {
  Client,
  EmbedBuilder,
  Collection,
} = require("discord.js");
const { config } = require('dotenv');
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
  const prefix = "6";
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ + /);
  const command = args.shift().toLocaleLowerCase();

  const cmd = client.commands.get(command);

  if (cmd) {
    if (cmd.cooldown) {
      if (Time.has(`${cmd.name}${message.author.id}`))
        return message.channel.send(
          `You already did this! come back in ${ms(
            Time.get(`${cmd.name}${message.author.id}`) - Date.now(),
            { long: false }
          )}`
        );
      cmd.run(client, message, args);
      Time.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown);
      setTimeout(() => {
        Time.delete(`${cmd.name}${message.author.id}`);
      }, cmd.cooldown);
    } else {
      cmd.run(client, message, args);
    }
  }

  if (await User.findOne({ userId: message.author.id })) {
    if (xpdown.has(message.author.id)) return;
    const xplist = [15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 27, 29, 30, 35];
    const xprandom = Math.floor(Math.random() * xplist.length);
    const asd = await User.findOne({ userId: message.author.id });
    await User.findOneAndUpdate(
      { userId: message.author.id },
      { xp: asd.xp + Number(xprandom) }
    );
    xpdown.add(message.author.id);
    setTimeout(() => {
      xpdown.delete(message.author.id);
    }, 4000);
  }

  if (message.content == "7hola") {
    const embed = new EmbedBuilder()
      .setTitle("pene")
      .setDescription("poronga")
      .setAuthor({
        name: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();

    message.channel.send({
      embeds: [embed],
    });
  }
});

client.login(process.env.TOKEN);
console.log(`Ready!`);
