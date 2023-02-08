import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer"
import AnecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		const newAnecdote = await AnecdoteService.createNew(content)
		dispatch(addAnecdote(newAnecdote))
		dispatch(setNotification(`you created the Anecdote: '${content}'`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5 * 1000)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</>
	)
}

export default AnecdoteForm
