import { createSlice } from "@reduxjs/toolkit"
//servicio
import anecdoteService from "../services/anecdotes"

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
			state.push(action.payload)
		},
		setAnecdotes: (state, action) => {
			return action.payload
		},
	},
})

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const newAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(addAnecdote(newAnecdote))
	}
}

export const { addVote, addAnecdote, appendAnecdotes, setAnecdotes } =
	anecdoteSlice.actions
export default anecdoteSlice.reducer
