const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  userId: String,
  nick: String,
  avatar: String,
  prefix: {
    type: String,
    default: '6'
  },
  Language: {
    type: String,
    default: "English",
  },
  color: {
    type: String,
    default: "BLACK",
  },
  emoji: {
    type: String,
    default: "<a:keeodbailando:1094283156527521853>",
  },
  marry: String,
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
        user: {
            type: Types.ObjectId,
            ref: 'User'
        },
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