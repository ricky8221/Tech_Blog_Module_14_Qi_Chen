const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt")


//  create user
router.post('/', async (req,res)=>{
    try{
        const userData = await User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        });
        req.session.save(()=>{
            req.session.id = userData.id;
            req.session.user_name = userData.user_name;
            req.session.loggedIn = true;

            res.json(userData);
        });
    } catch(err){
        res.status(500).json(err)
    }
});

//  login
router.post('/login', async (req,res)=>{
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'No user found!' });
      return;
    }

    const validPassword =  userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//  logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;