const quizRepo = require('../repositories/quizRepository');
const topicRepo = require('../repositories/topicRepository');

const getAllQuizzes = async (filters) => {
  const quizzes = await quizRepo.getAllQuizzes(filters);

  const quizzesWithTopicsNames = await Promise.all(
    quizzes.map(async (quiz) => {
      const topicId = quiz.topic;
      const topic = await topicRepo.getTopicById(topicId)

      return {
        ...quiz.toObject(),
        topic: topic ? topic.name : null,
      };
    })
  );

  return quizzesWithTopicsNames;
};


const getQuizById = async (id) => {
  const quiz = await quizRepo.getQuizById(id);
 
  if (!quiz) return null;

  const topicId = quiz.topic;
  const topic = await topicRepo.getTopicById(topicId)
  return {
    ...quiz.toObject(),
    topic: topic ? topic.name : null,
  };
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
