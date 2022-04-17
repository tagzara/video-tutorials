const authController = require('../controllers/authController.js');
const homeController = require('../controllers/homeController.js');
const courseController = require('../controllers/courseControllers.js');

module.exports = (app) => {
    app.use('/auth', authController);
    app.use('/', homeController);
    app.use('/course', courseController);
};