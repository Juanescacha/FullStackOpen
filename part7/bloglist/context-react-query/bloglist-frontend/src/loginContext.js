import { createContext, useReducer, useContext } from "react"

const loginReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.data
		case "REMOVE":
			return false
		default:
			return state
	}
}

const LoginContext = createContext()

export const LoginContextProvider = ({ children }) => {
	const [login, loginDispatch] = useReducer(loginReducer, false)

	return (
		<LoginContext.Provider value={[login, loginDispatch]}>
			{children}
		</LoginContext.Provider>
	)
}

// helpers

export const useLoginValue = () => {
	const loginAndDispatch = useContext(LoginContext)
	return loginAndDispatch[0]
}

export const useLoginDispatch = () => {
	const loginAndDispatch = useContext(LoginContext)
	return loginAndDispatch[1]
}

export default LoginContext
