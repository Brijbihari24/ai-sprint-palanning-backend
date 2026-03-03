const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { generatePlan } = require("./agent.js");
const { connection } = require("./db.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


// console.log("Loaded API Key:", process.env.OPENAI_API_KEY);
app.post("/generate-plan", async (req, res) => {
    try {
        const { goal } = req.body;

        if (!goal) {
            return res.status(400).json({ msg: "Goal is required" });
        }

        const plan = await generatePlan(goal);
        const parsed = JSON.parse(plan);

        for (const task of parsed.tasks) {
            await connection.promise().query(
                "INSERT INTO tasks (goal, title, day) VALUES (?, ?, ?)",
                [goal, task.title, task.day]
            );
        }

        res.json(parsed);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

app.listen(5002, () => console.log("Server running on 5002"));