const { Schema, model, Types } = require("mongoose");

const ServerSchema = new Schema({
  guildId: { type: String, required: true },
  items: [
    {
      type: Types.ObjectId,
      ref: "Item",
    },
  ],
});
module.exports = model("Server", ServerSchema);
