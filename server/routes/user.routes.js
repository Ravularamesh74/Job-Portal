const router = require('express').Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth.middleware');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            bio: user.bio,
            phone: user.phone,
            location: user.location,
            avatar: user.avatar,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.phone = req.body.phone || user.phone;
        user.location = req.body.location || user.location;
        user.avatar = req.body.avatar || user.avatar;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            bio: updatedUser.bio,
            phone: updatedUser.phone,
            location: updatedUser.location,
            avatar: updatedUser.avatar,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Get saved jobs
// @route   GET /api/users/saved
// @access  Private
router.get('/saved', protect, async (req, res) => {
    const user = await User.findById(req.user._id).populate('savedJobs');
    if (user) {
        res.json(user.savedJobs);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Toggle save job
// @route   POST /api/users/save/:jobId
// @access  Private
router.post('/save/:jobId', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    const jobId = req.params.jobId;

    if (user) {
        if (user.savedJobs.includes(jobId)) {
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            user.savedJobs.push(jobId);
        }
        await user.save();
        res.json(user.savedJobs);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = router;
