import { store } from "./store"

console.log(store.getState())

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
	if (good === 0 && neutral === 0 && bad === 0) {
		return <h3>No feedback given</h3>
	}

	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />

				<StatisticLine text="all" value={good + neutral + bad} />
				<StatisticLine
					text="average"
					value={(good * 1 + bad * -1) / (good + neutral + bad)}
				/>
				<StatisticLine
					text="positive"
					value={(good / (good + neutral + bad)) * 100 + "%"}
				/>
			</tbody>
		</table>
	)
}

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const App = () => {
	const handleGood = () => {
		store.dispatch({ type: "GOOD" })
	}

	const handleNeutral = () => {
		store.dispatch({ type: "OK" })
	}

	const handleBad = () => {
		store.dispatch({ type: "BAD" })
	}

	const handleReset = () => {
		store.dispatch({ type: "ZERO" })
	}

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={handleGood} />
			<Button text="neutral" handleClick={handleNeutral} />
			<Button text="bad" handleClick={handleBad} />
			<Button text="reset" handleClick={handleReset} />

			<h1>statistics</h1>
			<Statistics
				good={store.getState().good}
				neutral={store.getState().ok}
				bad={store.getState().bad}
			/>
		</div>
	)
}

export default App
