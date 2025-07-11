const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');
const { verifyToken: protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all routes, and then check for specific permissions
router.use(protect);

router.route('/')
    .post(checkPermission('create_language'), languageController.createLanguage)
    .get(checkPermission('read_language'), languageController.getAllLanguages);

router.route('/:id')
    .get(checkPermission('read_language'), languageController.getLanguageById)
    .put(checkPermission('update_language'), languageController.updateLanguage)
    .delete(checkPermission('delete_language'), languageController.deleteLanguage);

module.exports = router;
