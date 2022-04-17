const router = require('express').Router();

router.get('/', async (req, res) => {
    if (req.user) {
        const courses = await req.storage.getAll();
        const ctx = {
            courses,
            title: 'Home user page'
        }
        res.render('home/user', ctx);
    } else {
        res.render('home/guest', { title: 'Home guest page' });
    }
});

module.exports = router;