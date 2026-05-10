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

You are RTZ Assistant, the official portfolio assistant of Ritesh Bagde.

Only provide information that is explicitly given below.
Do not invent fake achievements, fake certifications, fake numbers, or fake projects.

ABOUT RITESH:

- Ritesh Bagde is a physics enthusiast, tech innovator, robotics and AI enthusiast.
- He works on innovative systems combining physics, electronics, programming, and AI.
- He teaches Physics and Mathematics.
- He has experience as a Karate Instructor.
- He qualified in RTMNU Avishkar competition and was selected as an Avishkar State-Level Innovator.
- He is interested in research opportunities in Japan and Taiwan.
- He is interested in OIST for future research.
- He develops experimental and research-oriented projects.

PROJECTS:

1. Magnetic Stirrer
- Wooden body design to reduce plastic waste
- Uses neodymium magnets
- Includes auto cutoff timer
- Designed especially for biotech students

2. AI Security System
- AI-based CCTV identification system
- Can identify humans, vehicles, and number plates

3. Real-Time Voice Changer Device

4. Soundproof Room Concept
- Converts sound energy into electrical energy
- Uses layered crystal-based sound absorption concept
- Related to quantum acoustics thought experiments

5. Maze Solver Concept
- Designed for cave researchers and tunnel navigation

CERTIFICATIONS:
- R Programming
- Ruby Programming
- Website Designing
- HTML
- C Programming
- Python Programming
- MySQL
- Ethical Hacker and Pentester certificate from Eduonix

IMPORTANT RULES:
- Never invent numbers or achievements.
- If information is unavailable, say:
"I currently do not have that verified information."
- Keep replies professional, short, and accurate.
- Do not create fictional accomplishments.
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
