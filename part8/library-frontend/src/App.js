import { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import SetBirth from "./components/SetBirth"
import { useApolloClient } from "@apollo/client"

const App = () => {
	const [page, setPage] = useState("authors")
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useEffect(() => {
		const tkn = localStorage.getItem("library-user-token")
		setToken(tkn)
	}, [page])

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token && (
					<>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("setBirth")}>
							Set Birth
						</button>
					</>
				)}
				{!token && (
					<button onClick={() => setPage("login")}>login</button>
				)}
				{token && (
					<button
						onClick={() => {
							setToken(null)
							localStorage.clear()
							client.resetStore()
						}}>
						logout
					</button>
				)}
			</div>

			<Authors show={page === "authors"} />
			<Books show={page === "books"} />
			<NewBook show={page === "add"} />
			<SetBirth show={page === "setBirth"} />
			<Login
				show={page === "login"}
				setPage={setPage}
			/>
		</div>
	)
}

export default App
