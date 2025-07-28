const express = require('express');
const { getAllCourse, getCourseById , createCourse, updateCourse, deleteCourse, searchCourse } = require('../controllers/course_controller.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

router.get('/getAllCourse', getAllCourse);
router.get('/getCourse/:id', getCourseById );
router.get('/searchCourse', searchCourse);
router.post('/createCourse', auth, createCourse);
router.patch('/updateCourse/:id', auth, updateCourse);
router.delete('/deleteCourse/:id', auth, deleteCourse);

module.exports = router; 