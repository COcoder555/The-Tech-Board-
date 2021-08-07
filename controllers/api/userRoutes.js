const router = require('express').Router();
// const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');


// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             where: userId: req.session.user_id
//             include: [{
//                 model: Comment,
//                 include: [User]
//             }, User]
//         })
//       const posts = postData.map(post=> post.toJSON())
//       console.log(posts)
//       res.status(200).render('homepage',{posts})
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err);
     
//       }
//     });
//     router.get('/', async (req, res) => {
//         try {
//             const postData = await Post.findAll({
//                 where: userId: req.session.user_id
//                 include: [{
//                     model: Comment,
//                     include: [User]
//                 }, User]
//             })
//           const posts = postData.map(post=> post.toJSON())
//           console.log(posts)
//           res.status(200).render('',{posts})
//         } catch (err) {
//             console.log(err)
//             res.status(500).json(err);
         
//           }
//         });
    


    module.exports = router;