const mongoose = require('mongoose')
const User = require('./User')

const postSchema = mongoose.Schema({

    post_title: {type: String, default: ''},
    post_owner_id: mongoose.Schema.Types.ObjectId,
    post_owner_name: String,
    post_description: {type: String, default: ''},
    post_likecounts: {type: Number, default: 0},
    post_commentcounts: {type: Number, default: 0},
    post_date: {type: Date, default: Date.now},
    post_comments: [String],
    post_likes_from: [String]
})

module.exports = mongoose.model('posts', postSchema)