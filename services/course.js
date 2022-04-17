const Course = require('../models/Course.js');
const User = require('../models/User.js');

async function getAll() {
    return Course.find({}).lean();
}

async function getCourseById(id) {
    return Course.findById(id).populate('enrolledUsers').lean();
}

async function createCourse(courseData) {
    const pattern = new RegExp(`^${courseData.name}$` , 'i');
    const existing = await Course.findOne({ title: { $regex: pattern } });

    if (existing) {
        throw new Error('A course with this name already exists!');
    }

    const course = new Course(courseData);

    await course.save();

    return course;
}

async function editCourse(id, courseData) {
    const course = await Course.findById(id);

    course.title = courseData.title.trim();
    course.description = courseData.description.trim();
    course.imageUrl = courseData.imageUrl.trim();
    course.duration = courseData.duration.trim();

    return course.save();
}

async function deleteCourse(id) {
    return Course.findByIdAndDelete(id);
}

async function enrollCourse(courseId, userId) {

    return Promise.all([
        Course.updateOne({ _id: courseId }, { $push: { enrolledUsers: userId } }),
        User.updateOne({ _id: userId }, { $push: { enrolledCourses: courseId } })
    ]);
}

module.exports = {
    getAll,
    createCourse,
    getCourseById,
    editCourse,
    deleteCourse,
    enrollCourse
};