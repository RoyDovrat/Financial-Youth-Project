const videoRepo = require('../repositories/videoRepository');

const getAllVideos = (filters) => {
  return videoRepo.getAllVideos(filters);
};

const getVideoById = (id) => {
  return videoRepo.getVideoById(id);
};

const addVideo = (obj) => {
  return videoRepo.addVideo(obj);
};

const updateVideo = (id, obj) => {
  return videoRepo.updateVideo(id, obj);
};

const deleteVideo = (id) => {
  return videoRepo.deleteVideo(id);
};

module.exports = {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
};
