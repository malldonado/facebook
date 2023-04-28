exports.home = (req, res) => {
    res.send('Welcome');
    res.status(403).json({
        message: 'Invalid',
        error: 'Invalid'
    })
};    