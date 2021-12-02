import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import filePath from "./filePath";

interface Planet {
  star: number;
}

const app = express();

/** Parses JSON data in a request automatically */
app.use(express.json());
/** To allow 'Cross-Origin Resource Sharing': https://en.wikipedia.org/wiki/Cross-origin_resource_sharing */
app.use(cors());

// read in contents of any environment variables in the .env file
dotenv.config();

// use the environment variable PORT, or 4000 as a fallback
const PORT_NUMBER = process.env.PORT ?? 4000;

// API info page
app.get("/", (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});

// GET /items
app.get("/planets", (req, res) => {
  const allPlanets = [
    { id: 1, name: "name" },
    { id: 2, name: "name" },
  ];
  res.status(200).json(allPlanets);
});

// GET /items/:id
app.get<{ id: string }>("/planets/:id", (req, res) => {
  const planetById = { id: req.params.id };
  if (!planetById.id) {
    res.status(404).json(planetById);
  } else {
    res.status(200).json(planetById);
  }
});

// PATCH /items/:id
app.patch<{ id: string }, {}, Partial<Planet>>("/planets/:id", (req, res) => {
  const updateStars = req.body;
  if (!updateStars.star) {
    res.status(404).json(updateStars);
  } else {
    res.status(200).json(updateStars);
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
