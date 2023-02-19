import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { QueryClient, QueryClientProvider } from "react-query"
import { NotificationContextProvider } from "./NotificationContext"
import { LoginContextProvider } from "./loginContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<LoginContextProvider>
		<NotificationContextProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</NotificationContextProvider>
	</LoginContextProvider>
)
