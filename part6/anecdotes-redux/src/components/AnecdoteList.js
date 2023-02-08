import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(addVote(id))
	}

	return (
		<>
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
		</>
	)
}

export default AnecdoteList
