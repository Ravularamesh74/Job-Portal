const router = require("express").Router();
const Application = require("../models/Application");
const { protect } = require("../middleware/auth.middleware");

// Apply job
router.post("/:jobId", protect, async (req, res) => {
    const app = await Application.create({
        user: req.user._id,
        job: req.params.jobId,
        // Note: The user's earlier model had more fields, but for this quick fix I'm keeping it simple as per their edit.
    });
    res.json(app);
});

module.exports = router;
