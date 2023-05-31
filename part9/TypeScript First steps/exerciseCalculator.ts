interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "You did great!"
      : rating === 2
      ? "Not too bad but could be better"
      : "You should try harder";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// interface CalculatorValues {
//   target: number;
//   hoursArray: Array<number>;
// }

// const parseArguments = (args: Array<string>): CalculatorValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");

//   if (
//     !isNaN(Number(args[2])) &&
//     args.slice(3).every((a) => !isNaN(Number(a)))
//   ) {
//     return {
//       target: Number(args[2]),
//       hoursArray: args.slice(3).map(Number),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

// try {
//   const { target, hoursArray } = parseArguments(process.argv);
//   console.log(calculateExercises(hoursArray, target));
// } catch (e: unknown) {
//   if (e instanceof Error)
//     console.log("Error, something bad happened, message: ", e.message);
// }
