const router = require('express').Router();
const { post } = require('.');
const { beforeDestroy } = require('../../config/connection');
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// post new post
router.post('/', withAuth, async (req, res) => {
    try{
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id:req.session.userId});

        res.status(200).json(newPost);
    } catch(err){
        res.status(500).json(err);
    }
});

// update post

router.put("/:id", withAuth, (req, res) => {
console.log(req.body, req.params.id)
Post.update(req.body, {
  where: {
    id: req.params.id
  }
})
  .then(affectedRows => {
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// delete post
router.delete("/:id", withAuth, (req, res) => {
    console.log(req.body, req.params.id)
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(affectedRows => {
        if (affectedRows > 0) {
          res.status(200).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;