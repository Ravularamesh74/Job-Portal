const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Job',
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: String,
        linkedin: String,
        portfolio: String,
        experienceYears: String,
        coverLetter: { type: String, required: true },
        resumeUrl: { type: String, required: true },
        status: {
            type: String,
            required: true,
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
