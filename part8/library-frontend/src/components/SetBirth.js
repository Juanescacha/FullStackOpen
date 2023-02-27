import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Select from "react-select"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const SetBirth = ({ show }) => {
	const [name, setName] = useState("")
	const [born, setBorn] = useState("")
	const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})
	const authors = useQuery(ALL_AUTHORS)

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			console.log("Author not found")
		}
	}, [result.data])

	const setBirth = event => {
		event.preventDefault()

		editAuthor({ variables: { name, setBornTo: Number(born) } })

		setName("")
		setBorn("")
	}

	if (authors.loading) {
		return <div>loading...</div>
	}

	const options = authors.data.allAuthors.map(author => {
		return { value: author.name, label: author.name }
	})

	if (!show) {
		return null
	}

	return (
		<div>
			<h2>Set Birth Year</h2>
			<form onSubmit={setBirth}>
				<div>
					name
					<Select
						options={options}
						isClearable={true}
						isSearchable={true}
						name="name"
						onChange={({ value }) => setName(value)}
					/>
				</div>
				<div>
					born
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default SetBirth
