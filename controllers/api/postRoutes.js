const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// To create a new Post

router.post('/',withAuth, async(req,res)=>{
    try{
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId

        });
        res.status(200).json(newPost);
    }catch(err){
        res.status(400).json(err);
    }
});
 

module.exports = router;