import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
	setNotificationTime,
	removeNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const vote = id => {
		dispatch(voteAnecdote(id))
		dispatch(
			setNotificationTime(
				`you voted '${anecdotes.find(a => a.id === id).content}'`,
				5
			)
		)
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5 * 1000)
	}
	return (
		<>
			{anecdotes
				.filter(anecdote => {
					return filter === ""
						? true
						: anecdote.content.includes(filter)
				})
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
