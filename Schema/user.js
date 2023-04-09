const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    userId: String,
    nick: String,
    avatar: String,
    color: {
        type: String,
        default: 'BLACK'
    },
    emoji: {
        type: String,
        default: '<a:keeodbailando:1094283156527521853>'
    },
    marry: String,
    bio: {
        type: String,
        default: 'No bio yet!'
    },
    cash: {
        type: Number,
        default: 0
    },
    bank: {
        type: Number,
        default: 0
    },
    rep: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    items: {
        type: Number,
        default: 0
    }
})
module.exports = model('User', UserSchema)