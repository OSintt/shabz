const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
  userId: String,
  nick: String,
  avatar: String,
  prefix: {
    type: String,
    default: "6",
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
    nick: String,
    is: Boolean,
    date: Date,
  },
  slots: {
    type: Number,
    default: 0,
  },
  slotsMax: {
    type: Number,
    default: 1,
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
  items: [
    {
      name: String,
      itemId: String,
      price: Number,
      description: String,
      emoji: String,
      owned: {
        type: Boolean,
        default: false,
      },
    },
  ],
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
          default: [],
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
  married: [
    {
      userId: String,
      nick: String,
      date: Date,
    },
  ],
  kisses: [
    {
      userId: String,
      n: Number,
    },
  ],
  blockeds: [
    {
      userId: String,
      nick: String,
    },
  ],
  afk: {
    afk: {
      type: Boolean,
      default: false,
    },
    date: Date,
    reason: String,
  },
  birthday: {
    type: Date,
    default: new Date(),
  },
  hen: {
    hen: {
      type: Boolean,
      default: false,
    },
  },
});
module.exports = model("User", UserSchema);
