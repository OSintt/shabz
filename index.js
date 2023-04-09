const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder, StringSelectMenuBuilder, Collection } = require('discord.js')
const Discord = require("discord.js")
const client = new Client({ intents: [3276799]})
const fs = require("fs")
const ms = require("ms")
const Time = new Discord.Collection();

require('./conexion')

client.commands = new Collection()

const commandFolder = fs.readdirSync("./commands")

for(const folder of commandFolder ) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`)

    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command);
        }
    }

client.on('messageCreate', async message => {

    const prefix = '6'
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ + /);
    const command = args.shift().toLocaleLowerCase()

    const cmd = client.commands.get(command)

    
    if(cmd) {
        if(cmd.cooldown){
            if(Time.has(`${cmd.name}${message.author.id}`)) return message.channel.send(`You already did this! come back in ${ms(Time.get(`${cmd.name}${message.author.id}`) - Date.now(), {long: false})}`)
            cmd.run(client, message, args)
            Time.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown)
            setTimeout(() => {
                Time.delete(`${cmd.name}${message.author.id}`)
            }, cmd.cooldown)
        } else {
            cmd.run(client, message, args)
        }
    }

    if(message.content == '7hola'){
        const embed = new EmbedBuilder()
        .setTitle("pene")
        .setDescription("poronga")
        .setAuthor({
            name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })
        })
        .setTimestamp()

        message.channel.send({
            embeds:[embed]
        })
    }
})

client.login("MTA5NDQ5NTYzNDI1MTMyMTQxNQ.GEadS5.VGapbVXG-msTrecq-kQZpKwZ0cx2W-n3zEBXzw")
console.log(`Ready!`)