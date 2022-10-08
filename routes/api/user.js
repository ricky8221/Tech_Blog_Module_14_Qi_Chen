const router = require('express').Router();
const { User } = require('../../models');

// TODO: create user
router.post('/', async (req,res)=>{
    try{

    } catch(err){
        res.status(500).json(err)
    }
});

// TODO: login
router.post('/login', async (req,res)=>{
    try{

    } catch(err){
        res.status(500).json(err)
    }
});

// TODO: logout
router.post('/logout', async (req,res)=>{
    try{

    } catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;