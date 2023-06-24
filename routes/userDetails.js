const express = require('express');
const { userDetails, getAllUsers, updateUser } = require('../controller/userDetails');

const router = express.Router();

router.post('/details',userDetails);
router.get('/getAllUsers',getAllUsers);
router.put('/updateUser/:phonenumber',updateUser);


module.exports = router;