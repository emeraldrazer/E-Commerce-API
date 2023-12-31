const express = require('express');
const router = express.Router();

// Import controllers
const { checkToken, checkCookieToken } = require('../middleware/token-system')
const { resetPassword, passwordResetRequest, form } = require('../controller/passwordreset')
const { register, login, logout, validate } = require('../controller/registration');
const { verifyEmail } = require('../controller/VerifyMail');
const { getNews, createNews, updateNews, deleteNews } = require('../controller/news');

// Registration & Login
router.get('/verify/:token', checkToken, verifyEmail);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate', checkCookieToken, validate);

// Password Reset
router.post('/password-reset', passwordResetRequest);
router.get('/password-reset/:token', checkToken, form)
router.patch('/password-reset/:token', checkToken, resetPassword);

// News
router.get('/news', getNews);
router.post('/create/news', createNews);
router.patch('/update/news', updateNews);
router.delete('/delete/news', deleteNews);

module.exports = router;