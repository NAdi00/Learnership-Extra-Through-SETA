const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Job Schema
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    salary: {
        type: String
    }
});


// Job Model
const Job = mongoose.model("Job", jobSchema);

// Test route
app.get("/", (req, res) => {

    res.send("Linking You API is running");

});

//Adding a job
app.post("/jobs", async (req, res) => {
    try {
        const job = await Job.create(req.body);

        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// READ - Get all jobs
app.get("/jobs", async (req, res) => {
    try {
        const jobs = await Job.find();

        res.json(jobs);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

//Removing data(job) from the database
app.delete("/jobs/:id", async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE - Edit a job
app.put("/jobs/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});