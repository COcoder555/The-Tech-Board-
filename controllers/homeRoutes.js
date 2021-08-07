const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
    
        const postData = await Post.findAll({
            include: [{
                model: Comment,
                include: [User]
            }, User]
        })
        console.log(postData)
      const posts = postData.map(post=> post.toJSON())
    
      res.status(200).render('homepage',{posts})
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
     
      }
    });
    
    



    module.exports = router