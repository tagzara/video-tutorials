const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 50 },
    imageUrl: { type: String, required: true },
    duration: { type: String, required: true },
    createdAt: { type: Date, required: true },
    enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('Course', schema);