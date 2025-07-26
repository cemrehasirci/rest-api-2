const express = require('express');
const router = express.Router();
const { getAllCourse, getCourseById , createCourse, updateCourse, deleteCourse, searchCourse } = require('../controllers/course_controller.js');


router.get('/getAllCourse', getAllCourse);
router.get('/getCourse/:id', getCourseById );
router.get('/searchCourse', searchCourse);
router.post('/createCourse', createCourse);
router.patch('/updateCourse/:id', updateCourse);
router.delete('/deleteCourse/:id', deleteCourse)

module.exports = router; 