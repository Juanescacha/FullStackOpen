import React from "react"
import ReactDOM from "react-dom/client"
import App, { Users, User, BlogView } from "./App"

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
	{ path: "/blogs/:id", element: <BlogView /> },
])

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
