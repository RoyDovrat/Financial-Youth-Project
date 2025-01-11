const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true, unique: true },
        correctAnswer: { type: String, required: true },
        topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }
    },

    { versionKey: false }
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;