const router = require('express').Router();
const Job = require('../models/Job');
const { protect, admin } = require('../middleware/auth.middleware');

// @desc    Fetch all jobs
// @route   GET /api/jobs
// @access  Public
router.get('/', async (req, res) => {
    const jobs = await Job.find({});
    res.json(jobs);
});

// @desc    Fetch single job
// @route   GET /api/jobs/:id
// @access  Public
router.get('/:id', async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (job) {
        res.json(job);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
});

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
router.post('/', protect, async (req, res) => {
    const {
        title,
        company,
        location,
        type,
        salary,
        description,
        experience,
        tags,
        deadline,
    } = req.body;

    const job = new Job({
        user: req.user._id,
        title,
        company,
        location,
        type,
        salary,
        description,
        experience,
        tags,
        deadline,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
});

module.exports = router;
