const express = require('express');
const {login, verifyToken, resendToken} = require('../controller/login');

const router = express.Router();

router.post('/login',login);
router.post('/verify',verifyToken)
router.post('/resend',resendToken)

module.exports = router;