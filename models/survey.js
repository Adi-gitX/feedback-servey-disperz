// const mongoose = require('mongoose');

// const SurveySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     questions: [{ type: String, required: true }],
//     assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Survey', SurveySchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    questions: [
        {
            type: {
                type: String,
                enum: ['rating', 'text'],
                required: true
            },
            question: {
                type: String,
                required: true
            }
        }
    ],
    assignedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Survey', SurveySchema);