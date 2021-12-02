import express from "express";
import cors from "cors";
import { Client } from "pg";
import dotenv from "dotenv";
import filePath from "./filePath";

interface Planet {
  id: string;
  name: string;
  distance_from_sun: number;
  diameter: number;
  moons: number;
  length_of_year: number;
  avg_temp: number | null;
  min_temp: number | null;
  max_temp: number | null;
  first_record: string | null;
  recorded_by: string | null;
  facts: string;
  stars: number;
}

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const client = new Client(dbConfig);

const databaseConnection = async () => {
  await client.connect();
  console.log("Connected to planet db!");
};
databaseConnection();

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

// GET /planets
app.get("/planets", async (req, res) => {
  const getAllPlanets = await client.query(
    "SELECT * FROM planets ORDER BY distance_from_sun"
  );
  const allPlanets = getAllPlanets.rows;
  res.status(200).json({
    status: "success",
    allPlanets,
  });
});

// GET /planets/:id
app.get<{ id: string }>("/planets/:id", async (req, res) => {
  const id = req.params.id;

  const getPlanetById = await client.query(
    "SELECT * FROM planets WHERE id = ($1)",
    [id]
  );
  const planet = getPlanetById.rows[0];

  if (planet) {
    res.status(200).json({
      status: "success",
      planet,
    });
  } else {
    res.status(404).json({
      status: "fail",
      data: {
        id: "Could not find a planet with that id.",
      },
    });
  }
});

// PATCH /items/:id
app.patch<{ id: string }, {}, Partial<Planet>>(
  "/planets/:id",
  async (req, res) => {
    const { stars } = req.body;
    const id = req.params.id;

    if (stars && typeof stars === "string") {
      const updateResponse = await client.query(
        "UPDATE planets SET stars = $2 WHERE id = $1 RETURNING *",
        [id, parseInt(stars)]
      );

      if (updateResponse.rowCount === 1) {
        const updatedStarsPlanet = updateResponse.rows[0];
        res.status(201).json({
          status: "success",
          data: {
            planet: updatedStarsPlanet,
          },
        });
      } else {
        res.status(404).json({
          status: "fail",
          data: {
            id: "Could not find a planet with that id.",
          },
        });
      }
    }
  }
);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
