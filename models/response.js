const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: String, required: true }]
});

module.exports = mongoose.model('Response', ResponseSchema);