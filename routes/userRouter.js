const express = require('express');
const router = express.Router();
const connection = require('../config/db.js');
const {allUsers} = require('../controller/addUser.js');

// router.get('/',allUsers);                // get all users
router.route('/').get(allUsers);







module.exports = router;