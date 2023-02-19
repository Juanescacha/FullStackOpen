import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		user: userReducer,
		users: usersReducer,
	},
})

export default store
