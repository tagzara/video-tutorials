const courseService = require('../services/course.js');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...courseService
    };
    
    next();
};