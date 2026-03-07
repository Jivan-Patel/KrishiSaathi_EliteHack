const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a question
router.post('/questions', async (req, res) => {
    const question = new Question({
        question: req.body.question
    });
    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST a reply
router.post('/questions/:id/reply', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            question.replies.push({ text: req.body.text });
            const updatedQuestion = await question.save();
            res.json(updatedQuestion);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST upvote (bonus)
router.post('/questions/:id/upvote', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            question.upvotes += 1;
            const updatedQuestion = await question.save();
            res.json(updatedQuestion);
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
