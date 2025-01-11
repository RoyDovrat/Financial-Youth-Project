const express = require('express');
const topicService = require('../services/topicService');

const router = express.Router();

// Entry point: http://localhost:3000/topics

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const topics = await topicService.getAllTopics(filters);
    res.json(topics);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await topicService.getTopicById(id);
    res.json(topic);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await topicService.addTopic(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await topicService.updateTopic(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await topicService.deleteTopic(id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
