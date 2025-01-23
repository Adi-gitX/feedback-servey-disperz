const User = require('../models/user');
const Survey = require('../models/survey');
const Response = require('../models/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.startSurvey = async (req, res) => {
    const { surveyId, answers } = req.body;
    const userId = req.user.id;
    try {
        const response = new Response({ survey: surveyId, user: userId, answers });
        await response.save();
        res.status(201).json({ message: 'Survey completed successfully', responseId: response._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewCompletedSurveys = async (req, res) => {
    const userId = req.user.id;
    try {
        const responses = await Response.find({ user: userId }).populate('survey', 'title');
        res.status(200).json(responses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewSurveyAnswers = async (req, res) => {
    const { surveyId } = req.params;
    const userId = req.user.id;
    try {
        const response = await Response.findOne({ survey: surveyId, user: userId }).populate('survey', 'title questions');
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};