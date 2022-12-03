const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Like = require('../models/Like')
const verifyToken = require('../verifyToken')

// POST (Create like)
router.post('/like/:postid', verifyToken, async(req,res)=>{

    // Find the current user id, username and the target post id, assign to the new like
    const curUserID = req.user._id
    const curUsername = (await User.findById(curUserID)).Username
    const postID = req.params.postid

    const like = new Like({
        like_post_id: postID,
        like_from_owner: curUsername,
        like_from_owner_id: curUserID
    })
    // Try to save the like in database
    try {
        const likeToSave = await like.save()
    } catch(err) {
        res.send({message:err})
    }

    // Check if the user is trying to like its own post
    const postRelated = await Post.findById(postID)
    const post_owner_id = postRelated.post_owner_id

    if (post_owner_id.equals(curUserID)) {
        return res.status(400).send({message: 'You cannot like yourself\'s post'})
    }    

    // Push the username to the post.post_likes_from array and save
    postRelated.post_likes_from.push(like.like_from_owner)
    postRelated.post_likecounts++
    await postRelated.save()
    res.send('Like was added successfully!')
  }) 

  module.exports = router