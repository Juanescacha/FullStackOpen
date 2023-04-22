import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("library-user-token")
	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null,
		},
	}
})

const httpLink = createHttpLink({
	uri: "http://localhost:4000",
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	// uri: "http://localhost:4000",
	link: authLink.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
