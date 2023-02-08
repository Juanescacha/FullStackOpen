import { useSelector, useDispatch } from "react-redux"
import { addVote, addAnecdote } from "./reducers/anecdoteReducer"

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(addVote(id))
	}

	const createAnecdote = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		dispatch(addAnecdote(content))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes
				.sort((x, y) => {
					if (x.votes > y.votes) return -1
					else return 1
				})
				.map(anecdote => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>
								vote
							</button>
						</div>
					</div>
				))}
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default App
