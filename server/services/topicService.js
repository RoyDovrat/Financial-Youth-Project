const topicRepo = require('../repositories/topicRepository');

const getAllTopics = (filters) => {
  return topicRepo.getAllTopics(filters);
};

const getTopicById = (id) => {
  return topicRepo.getTopicById(id);
};

const addTopic = (obj) => {
  return topicRepo.addTopic(obj);
};

const updateTopic = (id, obj) => {
  return topicRepo.updateTopic(id, obj);
};

const deleteTopic = (id) => {
  return topicRepo.deleteTopic(id);
};

module.exports = {
  getAllTopics,
  getTopicById,
  addTopic,
  updateTopic,
  deleteTopic,
};
