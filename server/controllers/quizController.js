const express = require('express');
const quizService = require('../services/quizService');

const router = express.Router();

// Entry point: http://localhost:3000/quizzes

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const quizzes = await quizService.getAllQuizzes(filters);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await quizService.getQuizById(id);
    res.json(quiz);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await quizService.addQuiz(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await quizService.updateQuiz(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await quizService.deleteQuiz(id);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
