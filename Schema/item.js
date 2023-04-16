const { Schema, model } = require("mongoose")

const ItemSchema = new Schema({
    name: String,
    itemId: String,
    price: Number,
    description: String,
    shoppable: {
      type: Boolean,
      default: false
    },
    emoji: String,
})
module.exports = model('Item', ItemSchema)