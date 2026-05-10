const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: `
You are RTZ AI Assistant.

You are the AI assistant of Ritesh Bagde.

You help visitors understand:
- robotics projects
- magnetic stirrer project
- AI security systems
- research interests
- certifications
- innovations
- contact guidance

Reply professionally and clearly.
`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

       const botReply = data?.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";

res.json({
    reply: botReply
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Something went wrong"
        });

    }

});

app.listen(3000, () => {
    console.log("Server running");
});
