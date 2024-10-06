import { useEffect } from "react"
import { DiaryEntry } from "./types"
import axios from "axios"

const Diary = ({ entry }: { entry: DiaryEntry }) => {
	return (
		<>
			<h3>{entry.date}</h3>
			<p>
				visibility: {entry.visibility}
				<br />
				weather: {entry.weather}
			</p>
		</>
	)
}

const EntryForm = () => {
	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				console.log("formulario enviado")
			}}>
			<h2>Add new entry</h2>
			date <input type="text" /> <br />
			visibility <input type="text" /> <br />
			weather <input type="text" /> <br />
			comment <input type="text" /> <br />
			<button type="submit">add</button>
		</form>
	)
}

const App = () => {
	const data: Array<object> = []

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				"http://localhost:3001/api/diaries"
			)
			console.log(response.data)
		}

		getData()

		return () => {
			// second
		}
	}, [])

	console.log(data)
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
