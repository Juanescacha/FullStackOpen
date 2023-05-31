const calculateBmi = (height: number, weight: number): string => {
	//	BMI Calculator
	//	weight -> kg
	//	height -> cm
	let BMI = weight / (height / 100) ** 2
	// let phrase = "Underweight (unhealthy weight)" ? BMI < 18.5 : "Normal (healthy weight)" ? BMI >= 18.5 && BMI < 25 : "Overweight (unhealthy weight)" ? BMI >= 25 && BMI < 30 : "Obese (unhealthy weight)"
	let phrase =
		BMI < 18.5
			? "Underweight (unhealthy weight)"
			: BMI >= 18.5 && BMI < 22.9
			? "Normal (healthy weight)"
			: BMI >= 22.9 && BMI < 24.9
			? "Overweight (at risk)"
			: "Overweight (moderately obese)"

	return phrase
}

const h: number = Number(process.argv[2])
const w: number = Number(process.argv[3])

console.log(calculateBmi(h, w))
