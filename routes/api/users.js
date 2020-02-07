const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator');
const User = require('../../models/user');

// @route   Post api/users
// @desc    Register User
// @access  Public
router.post(
    '/',
    [
        check('name','Name is required')
        .not().isEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('password',
        'Please enter a password with atleast 6 characters').isLength({min:6})
    ],
    (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,password,email} = req.body;

    try{
        let user = await User.findOne({email});
    //    let user = await User.findOne({email}).then(result =>{
    //         res.send(result);
    //    });

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    res.send('User route');
});



module.exports = router;