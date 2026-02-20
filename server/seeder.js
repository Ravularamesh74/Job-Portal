const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

const jobs = [
    {
        title: "Senior Frontend Engineer",
        company: "TechFlow",
        location: "Remote",
        type: "Full-time",
        salary: "$120k - $160k",
        description: "Work with React and Tailwind CSS.",
        experience: "5+ years",
        tags: ["React", "TypeScript", "Tailwind"],
        logo: "TF",
        logoColor: "#4F46E5",
        featured: true,
        deadline: "2026-03-31"
    },
    {
        title: "Product Designer",
        company: "Creative Co",
        location: "New York, NY",
        type: "Full-time",
        salary: "$90k - $130k",
        description: "Design beautiful user interfaces.",
        experience: "3+ years",
        tags: ["Figma", "UI/UX"],
        logo: "CC",
        logoColor: "#EC4899",
        featured: false,
        deadline: "2026-04-15"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        await Job.deleteMany();
        console.log("Old jobs cleared.");

        // Create a dummy user for the jobs
        let user = await User.findOne({ email: "admin@example.com" });
        if (!user) {
            user = await User.create({
                name: "Admin User",
                email: "admin@example.com",
                password: "password123",
                isAdmin: true
            });
            console.log("Admin user created.");
        }

        const sampleJobs = jobs.map(job => ({ ...job, user: user._id }));
        await Job.insertMany(sampleJobs);
        console.log("Jobs seeded!");

        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
