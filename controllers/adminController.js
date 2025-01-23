const User = require('../models/user');
const Survey = require('../models/survey');
const Response = require('../models/response');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.addUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User added successfully',
            userId: user._id,
            token: token
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.removeUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createSurvey = async (req, res) => {
    const { title, questions } = req.body;
    try {
        const survey = new Survey({ title, questions });
        await survey.save();
        res.status(201).json({ message: 'Survey created successfully', surveyId: survey._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.assignSurvey = async (req, res) => {
    const { surveyId, userIds } = req.body;
    try {
        const survey = await Survey.findById(surveyId);
        if (!survey) {
            return res.status(404).json({ message: 'Survey not found' });
        }

        // Check if any user is already assigned to another open survey
        for (const userId of userIds) {
            const existingSurvey = await Survey.findOne({ assignedUsers: userId, _id: { $ne: surveyId } });
            if (existingSurvey) {
                return res.status(400).json({ message: `User ${userId} is already assigned to another open survey` });
            }
        }

        survey.assignedUsers = userIds;
        await survey.save();
        res.status(200).json({ message: 'Survey assigned successfully', surveyId: survey._id, userIds: survey.assignedUsers });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find().populate('assignedUsers', 'username');
        res.status(200).json(surveys);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewSurveyAnswers = async (req, res) => {
    const { surveyId } = req.params;
    try {
        const responses = await Response.find({ survey: surveyId }).populate('user', 'username');
        res.status(200).json(responses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};