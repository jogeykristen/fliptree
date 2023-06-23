const express = require('express');
const { userDetails } = require('../controller/userDetails');

const router = express.Router();

router.post('/details',userDetails);


module.exports = router;