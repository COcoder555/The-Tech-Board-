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
    
      res.status(200).render('homepage',{posts, logged_in: req.session.logged_in})
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
     
      }
    });
    
router.get('/', async(req,res)=>{
  try{
    res.status(200).render('dashboard',{posts})
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});



router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});



    module.exports = router