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


// Create new Comment
router.post('/', withAuth, async(req,res) => {
    try {
        const newComment = await Comment.create({
         
           ...req.body,
                    // postId: req.body.postId,
            userId: req.session.user_id,
            logged_in: req.session.logged_in
        });
        console.log(newComment)
        res.status(200).json(newComment);
    
    } catch (err) {
        res.status(400).json(err);
    }
});

//To Delete a comment

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
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