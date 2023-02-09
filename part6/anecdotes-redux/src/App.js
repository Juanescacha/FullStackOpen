import { useEffect } from "react"

// Redux

import { useDispatch } from "react-redux"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

// Componentes

import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeAnecdotes())
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
