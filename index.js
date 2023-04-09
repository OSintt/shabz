const { Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder, StringSelectMenuBuilder, Collection } = require('discord.js')
const client = new Client({ intents: [3276799]})
const fs = require("fs")

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
        cmd.run(client, message, args)
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
    if(message.content == '7test'){
        
    }
})

client.login("MTA4MjAyNTAyOTA3MzY0MTQ3Mg.GC_J_U.iQbOuFW2VpnWTsYrkH8JXGDzXXlTEOkZuZFL6M")
console.log("Ready!")