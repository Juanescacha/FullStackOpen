import { useEffect } from "react"

// Servicios

import anecdoteService from "./services/anecdotes"

// Redux

import { useDispatch } from "react-redux"
import { setAnecdotes } from "./reducers/anecdoteReducer"

// Componentes

import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		anecdoteService.getAll().then(anecdotes => {
			dispatch(setAnecdotes(anecdotes))
		})
	}, [dispatch])

	return (
		<>
			<h2>Anecdotes</h2>
			<Filter />
			<Notification />
			<AnecdoteList />
			<AnecdoteForm />
		</>
	)
}

export default App
