import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	}
}

const initialState = []

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState,
	reducers: {
		addVote: (state, action) => {
			const id = action.payload
			const anecdoteIndex = state.findIndex(a => a.id === id)
			state[anecdoteIndex].votes += 1
		},
		addAnecdote: (state, action) => {
			const newAnecdote = asObject(action.payload)
			state.push(newAnecdote)
		},
		appendAnecdotes: (state, action) => {
			state.push(action.payload)
		},
		setAnecdotes: (state, action) => {
			return action.payload
		},
	},
})

export const { addVote, addAnecdote, appendAnecdotes, setAnecdotes } =
	anecdoteSlice.actions
export default anecdoteSlice.reducer
