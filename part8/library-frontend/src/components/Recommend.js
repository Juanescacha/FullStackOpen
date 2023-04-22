import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Books = ({ show }) => {
	const result = useQuery(ALL_BOOKS)
	const me = useQuery(ME)

	if (!show) {
		return null
	}

	if (result.loading) {
		return <div>loading...</div>
	}

	const books = result.data.allBooks

	const filter = me.data.me.favoriteGenre

	const filteredBooks = books.filter(book => book.genres.includes(filter))

	return (
		<div>
			<h2>books</h2>
			in your favorite genre <b>{filter}</b>
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
		</div>
	)
}

export default Books
