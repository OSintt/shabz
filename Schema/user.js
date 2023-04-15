const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    userId: String,
    nick: String,
    avatar: String,
    Language: {
        type: String,
        default: 'English'
    },
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
    pija: Number,
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
    },
    hugs: {
        type: Number,
        default: 0,
    },
    pats: {
        type: Number,
        default: 0
    },
    slots:{
        type: Number,
        default: 1
    },
    kiss: {
        type: Array,
        default: []
    },
    afk: {
        afk: {
            type: Boolean,
            default: false
        },
        reason: String
    }
})
module.exports = model('User', UserSchema)