import { useMutation } from "@apollo/client"
import { useState } from "react"
import { LOGIN } from "../queries"

const Login = ({ show, setPage }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [login] = useMutation(LOGIN, {
		onError: error => {
			console.log(error.graphQLErrors[0].message)
		},
	})

	if (!show) {
		return null
	}

	const submit = async event => {
		event.preventDefault()

		try {
			const result = await login({
				variables: { username, password },
			})

			if (result.data.login !== null) {
				const token = result.data.login.value
				localStorage.setItem("library-user-token", token)
				setPage("authors")
			} else {
				console.log("Wrong credentials")
			}
		} catch (error) {
			console.log(error)
		}
		setUsername("")
		setPassword("")
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default Login
