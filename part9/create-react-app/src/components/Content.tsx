import { CoursePart } from "../types"

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	)
}

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case "basic":
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
				</p>
			)
		case "group":
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					project exercises {part.groupProjectCount}
				</p>
			)
		case "background":
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					{part.description}
					<br />
					{part.backgroundMaterial}
				</p>
			)
		case "special":
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					{part.description} <br />
					{part.requirements && part.requirements.join(", ")}
				</p>
			)
		default:
			return assertNever(part)
	}
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<>
			{courseParts.map((part, index) => (
				<Part
					part={part}
					key={index}
				/>
			))}
		</>
	)
}

export default Content
