const express = require('express');
const Student = require('../models/studentModel');
const {addStudent, loginUser} = require('../controllers/StudentController');
const router = express.Router();

router.post('/', addStudent);
router.post('/login', loginUser);

module.exports = router;
