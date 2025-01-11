const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        questions: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }
        ],
        topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    },
    { versionKey: false }
);

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;
