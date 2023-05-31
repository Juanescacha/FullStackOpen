interface Result {
	periodLength: number
	trainingDays: number
	success: boolean
	rating: number
	ratingDescription: string
	target: number
	average: number
}

const calculateExercises = (
	dailyExerciseHours: Array<number>,
	target: number
): Result => {
	const periodLength = dailyExerciseHours.length
	const trainingDays = dailyExerciseHours.filter(h => h > 0).length
	const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength
	const success = average >= target
	const rating = success ? 3 : average >= target / 2 ? 2 : 1
	const ratingDescription =
		rating === 3
			? "You did great!"
			: rating === 2
			? "Not too bad but could be better"
			: "You should try harder"

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	}
}

const hoursArray = process.argv.slice(2, -1).map(Number)
const target = Number(process.argv.slice(-1))

console.log(calculateExercises(hoursArray, target))
