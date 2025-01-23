const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/login', userController.login);
router.post('/startSurvey', auth, userController.startSurvey);
router.get('/viewCompletedSurveys', auth, userController.viewCompletedSurveys);
router.get('/viewSurveyAnswers/:surveyId', auth, userController.viewSurveyAnswers);

module.exports = router;