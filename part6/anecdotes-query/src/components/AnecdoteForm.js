import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries("anecdotes")
		},
	})

	const onCreate = event => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		newAnecdoteMutation.mutate({ content, votes: 0 })
		notificationDispatch({
			type: "SHOW",
			data: `you created: '${content}'`,
		})
		setTimeout(() => {
			notificationDispatch({ type: "HIDE" })
		}, 5000)
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
