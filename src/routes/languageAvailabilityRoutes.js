const express = require('express');
const router = express.Router();
const languageAvailabilityController = require('../controllers/languageAvailabilityController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all routes, and then check for specific permissions
router.use(protect);

router.route('/')
    .post(checkPermission('create_language_availability'), languageAvailabilityController.createLanguageAvailability)
    .get(checkPermission('read_language_availability'), languageAvailabilityController.getAllLanguageAvailabilities);

router.route('/:id')
    .get(checkPermission('read_language_availability'), languageAvailabilityController.getLanguageAvailabilityById)
    .put(checkPermission('update_language_availability'), languageAvailabilityController.updateLanguageAvailability)
    .delete(checkPermission('delete_language_availability'), languageAvailabilityController.deleteLanguageAvailability);

module.exports = router;
