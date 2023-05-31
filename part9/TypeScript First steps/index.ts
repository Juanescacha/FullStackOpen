import express from "express";
import { calculateBmi } from "./bmiCalculator";
// import { calculateExercises } from "./exerciseCalculator"

const app = express();

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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
