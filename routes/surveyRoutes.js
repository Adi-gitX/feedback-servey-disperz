const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const auth = require('../middleware/auth');

router.get('/', surveyController.getAllSurveys);
router.get('/:surveyId', surveyController.getSurveyById);
router.post('/', surveyController.createSurvey);
router.put('/:surveyId', surveyController.updateSurvey);
router.delete('/:surveyId', surveyController.deleteSurvey);
router.post('/response', auth, surveyController.submitResponse);
router.get('/responses/:surveyId', surveyController.getResponsesBySurvey);

module.exports = router;