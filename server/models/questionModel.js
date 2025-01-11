const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true, unique: true },
        options: [
            { text: { type: String, required: true }, isCorrect: { type: Boolean, required: true } }
        ],
        topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }
    },

    { versionKey: false }
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;