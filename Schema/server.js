const { Schema, model } = require("mongoose")

const ServerSchema = new Schema({
    items: String
})
module.exports = model('Server', ServerSchema)  