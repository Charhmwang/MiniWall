const mongoose = require('mongoose')
const Post = require('./Post')
const User = require('./User')

const commentSchema = mongoose.Schema({
    comment_on_post_id: mongoose.Schema.Types.ObjectId,
    comment_owner: String,
    comment_from_owner_id: mongoose.Schema.Types.ObjectId,
    comment_text: String,
    comment_date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('comments', commentSchema)