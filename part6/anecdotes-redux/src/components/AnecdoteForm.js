// redux
import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationTime } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createAnecdote = async event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		dispatch(
			setNotificationTime(`you created the Anecdote: '${content}'`, 5)
		)
		dispatch(newAnecdote(content))
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
