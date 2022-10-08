const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// Render all post for homepage
router.get('/', async(req, res)=>{
    try {
        const postData = await Post.finall({
            include: [User],
        });

        const post = postData.map((post)=>post.get({ plain: true }));
        res.render('all-post', { post });
    }catch(err){
        res.status(500).json(err)
    }
});

// Render post by ID
router.get('/:id', async(req, res)=>{
    try{
        const postData = await Post.findByPK(req.params.id, {
            include: [
                User,{
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const post = postData.map((post)=>post.get({ plain: true }));
        if (postData){
            const post = postData.map((post)=>post.get({ plain: true }));
            res.render('single-post', { post });
        }
        else{
            res.status(400).json({message:"Post not found!"})
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// Log in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Sign up
router.get('/signup', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;