const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const OpenAI = require("openai");
const openai = new OpenAI();

async function generatePlan(goal) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are a sprint planning AI."
            },
            {
                role: "user",
                content: `Create a 14-day sprint plan for this goal: ${goal}.
Return only valid JSON in this format:

{
  "tasks": [
    {
      "title": "string",
      "day": number
    }
  ]
}`
            }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
    });

    return response.choices[0].message.content;
}

module.exports = { generatePlan };