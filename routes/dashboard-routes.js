const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Get all post for user
router.get('/', withAuth, async(req,res)=>{
    try{
        const postdata = await Post.findAll({
            where:{
                user_id:req.session.userId,
            }
        });
        const post = postdata.map((post)=>post.get({ plain:true }));

        res.render('all-posts', {
            layout:'dashboard', 
            post,
        });
    }catch(err){
        res.status(500).json(err);
    }
});
// Get new post for user
router.get('/new', withAuth, async(req,res)=>{
    res.render('new-post', {
        layout:'dashboard', 
    });
});

// Get edit post for user
router.get('/edit/:id', withAuth, async(req,res)=>{
    try{
        const postData = await Post.findByPK(req.params.id);

        if(postData){
            const post = postData.map((post)=> post.get({ plain:true }));
            res.render('edit-post', {
                layout:'dashboard',
                post,
            });
        } else{
            res.status(400).end();
        }
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;