const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  userId: String,
  nick: String,
  avatar: String,
  prefix: {
    type: String,
    default: '6'
  },
  color: {
    type: Number,
    default: 111,
  },
  emoji: {
    type: String,
    default: "<a:keeodbailando:1094283156527521853>",
  },
  marry: {
    userId: String,
    is: Boolean,
    date: Date
  },
  bio: {
    type: String,
    default: "No bio yet!",
  },
  cash: {
    type: Number,
    default: 0,
  },
  bank: {
    type: Number,
    default: 0,
  },
  pija: Number,
  rep: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0,
  },
  servers: [
    {
      server: {
        type: Types.ObjectId,
        ref: "Server",
      },
      inventory: [
        {
          type: Types.ObjectId,
          ref: "Item",
          default: []
        },
      ],
    },
    
  ],
  hugs: {
    type: Number,
    default: 0,
  },
  pats: {
    type: Number,
    default: 0,
  },
  slots: {
    type: Number,
    default: 1,
  },
  kisses: [
    {
        userId: String,
        n: Number
    }
  ],
  afk: {
    afk: {
      type: Boolean,
      default: false,
    },
    reason: String,
  },
  birthday: {
    type: Date,
    default: new Date()
  }
});
module.exports = model("User", UserSchema);