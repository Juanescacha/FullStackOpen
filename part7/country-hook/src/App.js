import React, { useState, useEffect } from "react"
import axios from "axios"

const useField = type => {
	const [value, setValue] = useState("")

	const onChange = event => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

const useCountry = name => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (name !== "") {
			axios
				.get(`https://restcountries.com/v3.1/name/${name}`)
				.then(response => {
					setCountry({
						found: true,
						data: response.data[0],
					})
				})
				.catch(error => {
					setCountry({
						found: false,
					})
				})
		}
	}, [name])
	return country
}

const Country = ({ country }) => {
	if (!country) {
		return null
	}

	if (!country.found) {
		return <div>not found...</div>
	}

	return (
		<div>
			<h3>{country.data.name.common} </h3>
			<div>capital {country.data.capital[0]} </div>
			<div>population {country.data.population}</div>
			<img
				src={country.data.flags.png}
				height="100"
				alt={country.data.flags.alt}
			/>
		</div>
	)
}

const App = () => {
	const nameInput = useField("text")
	const [name, setName] = useState("")
	const country = useCountry(name)

	const fetch = e => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App
