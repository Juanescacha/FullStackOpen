import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exercise = calculateExercises(daily_exercises, target);

  return res.status(200).json(exercise);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
