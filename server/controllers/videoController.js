const express = require('express');
const path = require('path');
const videoService = require('../services/videoService');
const upload = require('../middleware/upload')

const router = express.Router();

// Entry point: http://localhost:3000/videos

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const videos = await videoService.getAllVideos(filters);
    res.json(videos);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoService.getVideoById(id);
    res.json(video);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await videoService.addVideo(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Video upload failed" });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await videoService.updateVideo(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await videoService.deleteVideo(id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
