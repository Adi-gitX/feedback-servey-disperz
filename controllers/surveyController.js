const Survey = require('../models/survey');
const Response = require('../models/response');

exports.getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find();
        res.status(200).json(surveys);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getSurveyById = async (req, res) => {
    const { surveyId } = req.params;
    try {
        const survey = await Survey.findById(surveyId);
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.status(200).json(survey);
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

exports.updateSurvey = async (req, res) => {
    const { surveyId } = req.params;
    const { title, questions } = req.body;
    try {
        const survey = await Survey.findByIdAndUpdate(surveyId, { title, questions }, { new: true });
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.status(200).json({ message: 'Survey updated successfully', survey });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteSurvey = async (req, res) => {
    const { surveyId } = req.params;
    try {
        const survey = await Survey.findByIdAndDelete(surveyId);
        if (!survey) return res.status(404).json({ error: 'Survey not found' });
        res.status(200).json({ message: 'Survey deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.submitResponse = async (req, res) => {
    const { surveyId, answers } = req.body;
    const userId = req.user.id;
    try {
        const response = new Response({ survey: surveyId, user: userId, answers });
        await response.save();
        res.status(201).json({ message: 'Response submitted successfully', responseId: response._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getResponsesBySurvey = async (req, res) => {
    const { surveyId } = req.params;
    try {
        const responses = await Response.find({ survey: surveyId }).populate('user');
        res.status(200).json(responses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};