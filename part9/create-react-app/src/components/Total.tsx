import { CoursePart } from "../types"

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<p>
			Number of exercises{" "}
			{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</p>
	)
}

export default Total
