import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = ({ show }) => {
	const result = useQuery(ALL_BOOKS)
	const [filter, setFilter] = useState(null)

	if (!show) {
		return null
	}

	if (result.loading) {
		return <div>loading...</div>
	}

	const books = result.data.allBooks

	const genres = []

	books.forEach(book => {
		book.genres.forEach(genre => {
			if (!genres.includes(genre)) {
				genres.push(genre)
			}
		})
	})

	const filteredBooks = filter
		? books.filter(book => book.genres.includes(filter))
		: books

	return (
		<div>
			<h2>books</h2>

			{filter ? (
				<>
					in genre <b>{filter}</b>
				</>
			) : (
				<>all genres</>
			)}

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooks.map(book => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			{genres.map(genre => (
				<button
					key={genre}
					onClick={() => setFilter(genre)}>
					{genre}
				</button>
			))}
			<button onClick={() => setFilter(null)}>reset</button>
		</div>
	)
}

export default Books
