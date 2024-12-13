"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// !!!!
const generative_ai_1 = require("@google/generative-ai");
const app = (0, express_1.default)();
const port = 3000;
let todos = [
    { id: 1, title: "Learn Angular", status: "Completed" },
    { id: 2, title: "Build a todo app", status: "Completed" },
    { id: 3, title: "Make it think?", status: "Unfinished" },
    {
        id: 4,
        title: "Ensure component height stays consistent during status changes",
        status: "Unfinished",
    },
    {
        id: 5,
        title: "Improve User Experience: dropboxes in 2025 are simply not it",
        status: "Unfinished",
    },
    {
        id: 6,
        title: "Actually use components rather than some frankeinstein-monster",
        status: "Unfinished",
    },
    {
        id: 6,
        title: "Have fun!",
        status: "Completed",
    },
];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// pun not intentional
app.get("/todos", (req, res) => {
    res.json(todos);
});
app.post("/todos", (req, res) => {
    const status = req.body.status;
    const newTodo = {
        id: Date.now(), // shouldn't really be used in a production environment
        title: req.body.title,
        description: req.body.description,
        status: status,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
app.post("/todos/generate-description", async (req, res) => {
    const { title, apiKey } = req.body;
    if (!title || !apiKey) {
        res.status(400).send("Title and API key are required");
        return;
    }
    try {
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
            safetySettings: [
                {
                    category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });
        const prompt = `You are generating a neatly-structured multiple-step description for a to-do with the following title: "${title}". Make sure that your description fits it as well as you can, and always try to reply with bullet points. ABSOLUTELY NO BBCODE! Only <br>. This includes asterisks of any kind as highlight! It is possible that the user may use languages other than English, so pay attention.`;
        const result = await model.generateContent(prompt);
        const generatedDescription = result.response.text();
        // apparently I can't just get it to not output asterisks without tweaking anything further
        // therefore, let us cook:
        const filteredDescription = generatedDescription.replace(/\*/g, "");
        res.json({ description: filteredDescription });
    }
    catch (error) {
        console.error("Error generating description:", error);
        res.status(500).send("Error generating description");
    }
});
// no error handling at all other than for our ID
// (which is possible due to not-enough-modelling, aka -1 being a "valid" return value)
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            ...req.body,
        };
        res.json(todos[todoIndex]);
    }
    else {
        res.status(404).send("Todo not found");
    }
});
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.status(204).send();
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
