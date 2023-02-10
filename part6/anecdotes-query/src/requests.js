import axios from "axios"

const baseUrl = "http://localhost:3001"

export const getAnecdotes = () =>
	axios.get(`${baseUrl}/anecdotes`).then(res => res.data)

export const createAnecdote = content =>
	axios.post(`${baseUrl}/anecdotes`, content).then(res => res.data)
