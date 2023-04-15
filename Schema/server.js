const { Schema, model } = require("mongoose")

const ServerSchema = new Schema({
    guildId: { type: String, required: true },
    items: { type: Array, default: [] }
})
module.exports = model('Server', ServerSchema)