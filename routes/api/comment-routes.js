const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try{
      const newPost = await Comment.create({
          comment_id: req.body.comment_id,
          body: req.body.body,
          user_id:req.session.userId});

      res.status(200).json(newPost);
  } catch(err){
      res.status(500).json(err);
  }
});

module.exports = router;
