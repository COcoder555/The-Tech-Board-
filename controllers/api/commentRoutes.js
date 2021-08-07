const router = require('express').Router();
const { Comment } = require('../../models');
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
router.post('/', async(res, req) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            content: req.body.content,
            postId: req.body.postId,
            userid: req.session.userid,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//To Delete a comment

router.delete(':/id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.params.userId,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment associated with this user!' });
            return;
        }
        res.status(200).toJason(commentData);

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports=router;