const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/addUser', adminController.addUser);
router.delete('/removeUser/:userId', adminController.removeUser);
router.post('/createSurvey', adminController.createSurvey);
router.post('/assignSurvey', adminController.assignSurvey);
router.get('/viewSurveys', adminController.viewSurveys);
router.get('/viewSurveyAnswers/:surveyId', adminController.viewSurveyAnswers);

module.exports = router;