import { useQuery } from "react-query"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAnecdotes } from "./requests"

const App = () => {
	const handleVote = anecdote => {
		console.log("vote")
	}

	const { isLoading, isError, data } = useQuery("anecdotes", getAnecdotes, {
		retry: 1,
	})
	if (isLoading) return <div>loading data...</div>

	if (isError)
		return (
			<div>anecote service not available due to problems in server</div>
		)

	const anecdotes = data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
