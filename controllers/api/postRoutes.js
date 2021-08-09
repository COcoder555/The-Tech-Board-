const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// To create a new Post

router.post('/', withAuth, async(req,res)=>{
    try{ console.log(req.session.user_id)
        const newPost = await Post.create({
            ...req.body,
            userId:req.session.user_id

        });
        res.status(200).json(newPost);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
});
 

// To delete a post

router.delete('/:id', withAuth, async(req,res)=>{
    try{
        const postData = await Post.destroy({
            where:{
                id: req.params.id,
                userId: req.session.user_id,
            },
        });
    
    if (!postData) {
        res.status(404).json({ message: 'No post found associated with this id!' });
        return;
    }
    res.status(200).json(postData);
}catch (err) {
    res.status(500).json(err);
}
});

// getting and displaying a single post

router.get('/:id', withAuth, async (req, res) =>{
    console.log('route hit');
    try {
        const postSingle = await Post.findByPk(req.params.id, {
            include: [{
                model: Comment,
                include: [User]
            }, User]
        });
        if (!postSingle) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        const single = postSingle.toJSON();
        res.status(200).render('post',{...single,logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id',withAuth, async (req, res) => {
    try {
        console.log(req.body)
      const postUpdate = await Post.update(req.body, {
        where: {
          id: req.params.id,
        }
  
      });
      if (!postUpdate[0]) {
        res.status(404).json({ message: 'no post with this ID' })
        return;
      }
      res.status(200).json(postUpdate);
  
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }})

    // To get to user.handlebars

    router.get('/update/:id', withAuth, async (req, res) =>{
        console.log('route hit');
        try {
            const postSingle = await Post.findByPk(req.params.id, {
                include: [{
                    model: Comment,
                    include: [User]
                }, User]
            });
            if (!postSingle) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
            }
            const single = postSingle.toJSON();
            res.status(200).render('update',{...single,logged_in: req.session.logged_in});
        } catch (err) {
            res.status(500).json(err);
        }
    }); 


module.exports = router;