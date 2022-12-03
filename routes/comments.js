const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const verifyToken = require('../verifyToken')

// POST (Create comment)
router.post('/comment/:postid', verifyToken, async(req,res)=>{

    // Find the current user id, username and the target post id, assign to the new comment
    const curUserID = req.user._id
    const curUsername = (await User.findById(curUserID)).Username
    const postID = req.params.postid

    const comment = new Comment({
        comment_owner: curUsername,
        comment_from_owner_id: curUserID,
        comment_text: req.body.comment_text,
        comment_on_post_id: postID
    })
    // Try to save the comment in database
    try {
        const commentToSave = await comment.save()
    } catch(err) {
        res.send({message:err})
    }

    // Check if the user is trying to comment on its own post
    const postRelated = await Post.findById(postID)
    const post_owner_id = postRelated.post_owner_id

    if (post_owner_id.equals(curUserID)) {
        return res.status(400).send({message: 'You cannot comment on yourself\'s post'})
    }    

    // Push the username to the post.post_comments array and save
    const comm = comment.comment_owner + ": " + comment.comment_text
    postRelated.post_comments.push(comm)
    postRelated.post_commentcounts++
    await postRelated.save()
    res.send('Comment was added successfully!')
}) 

module.exports = router