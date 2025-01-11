const Topic = require('../models/topicModel');

const getAllTopics = (filters) => {
    return Topic.find(filters);
};

const getTopicById = (id) => {
    return Topic.findById(id);
};

const addTopic = (obj) => {
    const topic = new Topic(obj);
    return topic.save();
};

const updateTopic = (id, obj) => {
    return Topic.findByIdAndUpdate(id, obj);
};

const deleteTopic = (id) => {
    return Topic.findByIdAndDelete(id);
};

module.exports = {
    getAllTopics,
    getTopicById,
    addTopic,
    updateTopic,
    deleteTopic,
};
