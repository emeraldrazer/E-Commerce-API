const User = require('../db/schema/schema');

const isAuthenticated = (req, res, next) => {
    if (req.cookies.authToken) {
        
        const user = User.find({ _id: req.cookies.authToken });
        if (user) {
            req.user = user;
        }
    }
    next();
};

module.exports = { isAuthenticated };