const { validateEmail, validateLenght } = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
    const {
        first_name,
        last_name,
        email,
        password,
        username,
        bYear,
        bMonth,
        bDay,
        gender
    } = req.body;

    if(!validateEmail(email)) {
        return res.status(400).json({
            message: "Invalid email address",
        });
    }

    const check = await User.findOne({ email });
    if(check) {
        return res.status(400).json({
            message: "This emails address already exists, try with a different email address",
        });
    }

    if(!validateLenght(first_name, 3, 30)) {
        return res.status(400).json({
            message: "First name must between 3 and 30 characters"
        });
    }

    if(!validateLenght(last_name, 3, 30)) {
        return res.status(400).json({
            message: "Last name must between 3 and 30 characters"
        });
    }

    if(!validateLenght(password, 6, 30)) {
        return res.status(400).json({
            message: "Password must be atleast 6 characters"
        });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    console.log(cryptedPassword);
    return;
    const user = await new User({
        first_name,
        last_name,
        email,
        password,
        username,
        bYear,
        bMonth,
        bDay,
        gender
    }).save();
    res.json({
        success: true,
        user: user
    });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};    