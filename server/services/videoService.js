const videoRepo = require('../repositories/videoRepository');
const topicRepo = require('../repositories/topicRepository');

const getAllVideos = async (filters) => {
  const videos = await videoRepo.getAllVideos(filters);
  
  const videosWithTopicsNames = await Promise.all(
    videos.map(async (video) => {
      const topicId = video.topic;
      const topic = await topicRepo.getTopicById(topicId)

      return {
        ...video.toObject(),
        topic: topic ? topic.name : null,
      };
    })
  );
  return videosWithTopicsNames;
};

const getVideoById = async (id) => {
  const video = await videoRepo.getVideoById(id);
 
  if (!video) return null;

  const topicId = video.topic;
  const topic = await topicRepo.getTopicById(topicId)
  return {
    ...video.toObject(),
    topic: topic ? topic.name : null,
  };
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
