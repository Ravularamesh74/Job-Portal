const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        tags: [String],
        logo: String,
        logoColor: String,
        featured: {
            type: Boolean,
            default: false,
        },
        posted: {
            type: String,
            default: 'Just now',
        },
        deadline: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
