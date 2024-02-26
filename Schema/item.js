const { Schema, model } = require("mongoose")

const ItemSchema = new Schema({
  guildId: String,
  items: [
    {
      name: String,
      itemId: String,
      price: Number,
      description: String,
      emoji: String,
      users: {
        type: Number,
        default: 0
      }
    }
  ]
})
module.exports = model('Item', ItemSchema)