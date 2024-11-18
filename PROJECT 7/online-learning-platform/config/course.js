const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// Enroll in a course
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.students.includes(req.user))
            return res.status(400).json({ message: 'Already enrolled' });

        course.students.push(req.user);
        await course.save();

        res.json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
