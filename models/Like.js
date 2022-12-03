const mongoose = require('mongoose')
const Post = require('./Post')
const User = require('./User')

const likeSchema = mongoose.Schema({

    like_date: {type: Date, default: Date.now},
    like_post_id: mongoose.Schema.Types.ObjectId,
    like_from_owner: String,
    like_from_owner_id: mongoose.Schema.Types.ObjectId

})

module.exports = mongoose.model('likes', likeSchema)