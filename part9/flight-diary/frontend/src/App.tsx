import { useEffect, useState } from "react"
import { DiaryEntry } from "./types"
import axios, { AxiosError } from "axios"

const Diary = ({ entry }: { entry: DiaryEntry }) => {
	return (
		<>
			<h3>{entry.date}</h3>
			<p>
				visibility: {entry.visibility}
				<br />
				weather: {entry.weather}
				<br />
				comment: {entry.comment}
			</p>
		</>
	)
}

const EntryForm = () => {
	const [date, setDate] = useState<string>()
	const [visibility, setVisibility] = useState<string>()
	const [weather, setWeather] = useState<string>()
	const [comment, setComment] = useState<string>()

	const [message, setMessage] = useState<string>()

	const addEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault()

		try {
			await axios.post("http://localhost:3001/api/diaries", {
				date,
				visibility,
				weather,
				comment,
			})

			setDate("")
			setVisibility("")
			setWeather("")
			setComment("")
		} catch (e) {
			const error = e as AxiosError
			const message = error.response?.data as string

			if (message) {
				setMessage(message)
			}

			setTimeout(() => {
				setMessage("")
			}, 5000)
		}
	}

	return (
		<form onSubmit={addEntry}>
			<h2>Add new entry</h2>
			<span style={{ color: "red" }}>{message}</span>
			<br />
			date
			<input
				type="date"
				value={date}
				onChange={e => setDate(e.target.value)}
			/>
			<br />
			visibility
			<label>
				<input
					type="radio"
					name="visibility"
					value="great"
					checked={visibility === "great"}
					onChange={e => setVisibility(e.target.value)}
				/>
				Great
			</label>
			<label>
				<input
					type="radio"
					name="visibility"
					value="good"
					checked={visibility === "good"}
					onChange={e => setVisibility(e.target.value)}
				/>
				Good
			</label>
			<label>
				<input
					type="radio"
					name="visibility"
					value="ok"
					checked={visibility === "ok"}
					onChange={e => setVisibility(e.target.value)}
				/>
				Ok
			</label>
			<label>
				<input
					type="radio"
					name="visibility"
					value="poor"
					checked={visibility === "poor"}
					onChange={e => setVisibility(e.target.value)}
				/>
				Poor
			</label>
			<br />
			weather
			<label>
				<input
					type="radio"
					name="weather"
					value="sunny"
					checked={weather === "sunny"}
					onChange={e => setWeather(e.target.value)}
				/>
				sunny
			</label>
			<label>
				<input
					type="radio"
					name="weather"
					value="rainy"
					checked={weather === "rainy"}
					onChange={e => setWeather(e.target.value)}
				/>
				rainy
			</label>
			<label>
				<input
					type="radio"
					name="weather"
					value="cloudy"
					checked={weather === "cloudy"}
					onChange={e => setWeather(e.target.value)}
				/>
				cloudy
			</label>
			<label>
				<input
					type="radio"
					name="weather"
					value="stormy"
					checked={weather === "stormy"}
					onChange={e => setWeather(e.target.value)}
				/>
				stormy
			</label>
			<label>
				<input
					type="radio"
					name="weather"
					value="windy"
					checked={weather === "windy"}
					onChange={e => setWeather(e.target.value)}
				/>
				windy
			</label>
			{/* <input
				type="text"
				value={weather}
				onChange={e => setWeather(e.target.value)}
			/> */}
			<br />
			comment
			<input
				type="text"
				value={comment}
				onChange={e => setComment(e.target.value)}
			/>
			<br />
			<button type="submit">add</button>
		</form>
	)
}

const App = () => {
	const [data, setData] = useState<DiaryEntry[]>([])

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				"http://localhost:3001/api/diaries"
			)
			setData(response.data)
		}

		getData()
	}, [])

	return (
		<>
			<EntryForm />
			<h2>Diary entries</h2>
			{data.map((e, index) => {
				return (
					<Diary
						entry={e as DiaryEntry}
						key={index}
					/>
				)
			})}
		</>
	)
}

export default App
