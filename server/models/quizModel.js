const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        questions: [QuestionSchema]
    },

    { versionKey: false }
);

const Quiz = mongoose.model('quiz', quizSchema);

module.exports = Quiz;