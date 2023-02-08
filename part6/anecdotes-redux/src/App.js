import { useSelector, useDispatch } from "react-redux"
import AnecdoteForm from "./components/AnecdoteForm"
import { addVote } from "./reducers/anecdoteReducer"

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(addVote(id))
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
			<AnecdoteForm />
		</div>
	)
}

export default App
