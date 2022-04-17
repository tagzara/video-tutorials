const router = require('express').Router();
const { isUser } = require('../middlewares/guards.js');
const { parseError } = require('../util/parsers.js');

router.get('/create', isUser(), (req, res) => {
    res.render('course/create');

});

router.post('/create', isUser(), async (req, res) => {
    console.log(req.body);

    try {
        const courseData = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            imageUrl: req.body.imageUrl.trim(),
            duration: req.body.duration.trim(),
            createdAt: new Date().toISOString()
        };

        await req.storage.createCourse(courseData);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);

        const ctx = {
            errors: parseError(err),
            offerData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration
            }
        };
        res.render('course/create', ctx);
    }
});

router.get('/details/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);
        const currentUser = JSON.stringify(req.user._id);
        const imAlreadyInTheCourse = JSON.stringify(course.enrolledUsers).includes(currentUser);
       
        const ctx = {
            course,
            imAlreadyInTheCourse,
            title: 'Details page'
        }

        res.render('course/details', ctx);
    } catch (err) {
        console.log(err.message);
        res.redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const course = await req.storage.getCourseById(req.params.id);

         const ctx = {
             course,
             title: 'Edit page'
         }

        res.render('course/edit', ctx);

    } catch (err) {
        console.log(err.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        await req.storage.editCourse(req.params.id, req.body);

        res.redirect('/course/details/' + req.params.id);
    } catch (err) {
        const ctx = {
            errors: parseError(err),
            offer: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                duration: req.body.duration
            }
        }
        res.render('course/edit', ctx);
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try {
        await req.storage.deleteCourse(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

router.get('/enroll/:id', isUser(), async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.user._id;
        await req.storage.enrollCourse(courseId, userId);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/course/details/' + req.params.id);
    }
});

module.exports = router;