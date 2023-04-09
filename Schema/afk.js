const { Schema, model } = require("mongoose")

const AfkSchema = new Schema({
  userId: {
    required: true,
    type: String
  },
  reason: String
});

module.exports = model('Afk', AfkSchema)