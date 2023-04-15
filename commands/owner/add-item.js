const { EmbedBuilder } = require("discord.js");
const User = require("../../Schema/user");
const { error, hershell, us } = require("../lib/utils");
const Server = require("../../Schema/server");
module.exports = {
  name: "add-item",
  description: "With this command can u create item!",
  auth: true,
  run: async (client, message, args, usExists) => {

    if(message.author.id !== hershell) return;

    const itName = args[0]
    if(!itName) return error(message, 'You forgot the name from item!')

    const itEmoji = args[1]
    if(!itEmoji) return error(message, 'You forgot the emoji from item!')

    const itRol = args[2]
    if(!itRol) return error(message, 'You forgot the rol from item!')

    const itPrice = args[3]
    if(!itPrice) return error(message, 'You forgot the price from item!')

    const itDescription = args.slice(4).join(' ')
    if(!itDescription) return error(message, 'You forgot to description from item!')

    const data = await Server.findOne({ guildId: message.guild.id })
    if(!data){
        const nuevo = new Server({
            guildId: message.guild.id,
            items: []
        });
        await nuevo.save();
    }

    if(data.items === []){
        const shop = {
            itemName: itName,
            itemEmoji: itEmoji,
            itemRol: itRol,
            itemPrice: itPrice,
            itemDescription: itDescription
        }
        data.items.push(shop)
        await data.save();

        return;
    }

    const shop = {
        itemName: itName,
        itemEmoji: itEmoji,
        itemRol: itRol,
        itemPrice: itPrice,
        itemDescription: itDescription
    }

    data.items.push(shop)
    await data.save();

    message.reply({ embeds: [
        new EmbedBuilder()
        .setTitle('New item created!')
        .setDescription(`**Name:** \`${itName}\`\n**Emoji:** \`${itEmoji}\`\n**Price:** \`${itPrice}\`\n**Description:** \`${itDescription}\``)
    ]})
  },
};
