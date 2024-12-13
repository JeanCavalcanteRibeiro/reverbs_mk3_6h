import express, { Request, Response } from "express";
import cors from "cors";

// !!!!
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const app = express();
const port = 3000;

// to enum or not to enum, that is the question
// For further info, read: reverb-frontend/src/app/components/todo-list-status/todo-list-status.component.ts
type TodoStatus = "Unfinished" | "Delayed" | "Completed" | "Cancelled";

interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
}

let todos: Todo[] = [
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

app.use(cors());
app.use(express.json());

// pun not intentional
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const status = req.body.status as TodoStatus;

  const newTodo = {
    id: Date.now(), // shouldn't really be used in a production environment
    title: req.body.title,
    description: req.body.description,
    status: status,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.post("/todos/generate-description", async (req: Request, res: Response) => {
  const { title, apiKey } = req.body;
  if (!title || !apiKey) {
    res.status(400).send("Title and API key are required");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
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
  } catch (error) {
    console.error("Error generating description:", error);
    res.status(500).send("Error generating description");
  }
});

// no error handling at all other than for our ID
// (which is possible due to not-enough-modelling, aka -1 being a "valid" return value)
app.put("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex >= 0) {
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...req.body,
    };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
