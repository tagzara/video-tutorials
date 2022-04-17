const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    enroledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = model('User', schema);