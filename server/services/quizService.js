const quizRepo = require('../repositories/quizRepository');

const getAllQuizzes = (filters) => {
  return quizRepo.getAllQuizzes(filters);
};

const getQuizById = (id) => {
  return quizRepo.getQuizById(id);
};

const addQuiz = (obj) => {
  return quizRepo.addQuiz(obj);
};

const updateQuiz = (id, obj) => {
  return quizRepo.updateQuiz(id, obj);
};

const deleteQuiz = (id) => {
  return quizRepo.deleteQuiz(id);
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  addQuiz,
  updateQuiz,
  deleteQuiz,
};
