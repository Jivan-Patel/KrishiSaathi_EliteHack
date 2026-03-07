const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    replies: [
        {
            text: { type: String, required: true },
            upvotes: { type: Number, default: 0 },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
