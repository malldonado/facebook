const User = require('../models/User');

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