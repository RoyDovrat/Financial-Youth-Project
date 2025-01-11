const Video = require('../models/videoModel');

const getAllVideos = (filters) => {
    return Video.find(filters);
};

const getVideoById = (id) => {
    return Video.findById(id);
};

const addVideo = (obj) => {
    const topic = new Video(obj);
    return topic.save();
};

const updateVideo = (id, obj) => {
    return Video.findByIdAndUpdate(id, obj);
};

const deleteVideo = (id) => {
    return Video.findByIdAndDelete(id);
};

module.exports = {
    getAllVideos,
    getVideoById,
    addVideo,
    updateVideo,
    deleteVideo,
};
