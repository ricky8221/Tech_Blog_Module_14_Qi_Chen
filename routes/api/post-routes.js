const router = require('express').Router();
const { post } = require('.');
const { beforeDestroy } = require('../../config/connection');
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// post new post
router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({...body, user_id:req.session.user_id});
        res.json(newPost);
    } catch(err){
        res.status(500).json(err);
    }
});

// update post
router.put('/:id', withAuth, async (req, res) => {
    try{
        const [affectRow] = await post.update(req.body, {
            where:{
                id: req.params.id
            }, 
        });

        if(affectRow > 0){
            res.status(200).end();
        } else{
            res.status(400).end();
        }
    } catch(err){
        res.status(500).json(err);
    }
});

// delete post
router.delete('/', withAuth, async (req, res) => {
    try{
        const [affectRow] = await Post.destroy({
            where:{
                id: req.params.id,
            },
        });
    if (affectRow > 0){
        res.status(200);
    } else{
        res.status(400);
    }
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;