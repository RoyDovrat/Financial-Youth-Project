const Quiz = require('../models/quizModel');

const getAllQuizzes = (filters) => {
    return Quiz.find(filters);
};

const getQuizById = (id) => {
    return Quiz.findById(id);
};

const addQuiz = (obj) => {
    const quiz = new Quiz(obj);
    return quiz.save();
};

const updateQuiz = (id, obj) => {
    return Quiz.findByIdAndUpdate(id, obj);
};

const deleteQuiz = (id) => {
    return Quiz.findByIdAndDelete(id);
};

module.exports = {
    getAllQuizzes,
    getQuizById,
    addQuiz,
    updateQuiz,
    deleteQuiz,
};
