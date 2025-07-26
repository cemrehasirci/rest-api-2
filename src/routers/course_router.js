const express = require('express');
const router = express.Router();
const { getCourse, createCourse, updateCourse, deleteCourse, searchCourse } = require('../controllers/course_controller.js');


router.get('/getCourse', getCourse);
router.get('/searchCourse', searchCourse);
router.post('/createCourse', createCourse);
router.patch('/updateCourse/:id', updateCourse);
router.delete('/deleteCourse/:id', deleteCourse)

module.exports = router; 