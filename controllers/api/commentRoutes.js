const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');



// To get all Comments

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map(comment => comment.toJason());

        res.status(200).render('homepage', { comments });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id',withAuth, async (req, res) => {
    try {
      const commentUpdate = await Comment.update(req.body, {
        where: {
          id: req.params.id,
        }
  
      });
      if (!commentUpdate[0]) {
        res.status(404).json({ message: 'no comment with this ID' })
        return;
      }
      res.status(200).json(commentUpdate);
  
    } catch (err) {
      res.status(500).json(err);
    }})





router.post('/', withAuth, async(req,res)=>{
    try{ console.log(req.session.user_id)
        const newComment = await Comment.create({
            ...req.body,
            postId: req.body.postId,
            userId:req.session.user_id
         

        });
        res.status(200).json(newComment);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
});

//To Delete a comment

router.delete('/:id', withAuth, async (req, res) => {
    console.log('rout hit for sure')
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        console.log(id,'Whatever it doesnt matter')
        if (!commentData) {
            res.status(404).json({ message: 'No comment associated with this user!' });
            return;
        }
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports=router;