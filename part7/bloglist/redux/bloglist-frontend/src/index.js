import React from "react"
import ReactDOM from "react-dom/client"
import App, { Users, User } from "./App"

import store from "./store"
import { Provider } from "react-redux"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{
		path: "/users",
		element: <Users />,
	},
	{ path: "/users/:id", element: <User /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
