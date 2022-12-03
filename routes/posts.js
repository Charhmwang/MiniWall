const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const User = require('../models/User')
const verifyToken = require('../verifyToken')


// GET (Read all the posts in a popularity and chronological order)
router.get('/view-posts', verifyToken, async(req,res) =>{
    try {
        const posts = await Post.find().sort({post_likecounts: -1, post_date: -1})
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

// POST (Post a text)
router.post('/create-post', verifyToken, async(req,res)=>{

  // Find the current user id and username, assign to the new post
  const curUserID = req.user._id
  const curUsername = (await User.findById(curUserID)).Username

  const postData = new Post({
      post_owner_id: curUserID,
      post_owner_name: curUsername,
      post_title: req.body.post_title,
      post_description: req.body.post_description
  })
  // Try to save to the database
  try{
    const postToSave = await postData.save()
    res.send(postToSave)
  }catch(err){
    res.send({message:err})
  }
}) 

module.exports = router