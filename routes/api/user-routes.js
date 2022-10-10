const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt")


//  create user
router.post("/", (req, res) => {
  User.create({
    user_name: req.body.user_name,
    password: req.body.password
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.user_name = dbUserData.user_name;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//  login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

//  logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      console.log(req.session.loggedIn)
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;