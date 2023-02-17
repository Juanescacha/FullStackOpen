import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const blogSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		setBlogs: (state, action) => {
			return action.payload
		},
		addBlog: (state, action) => {
			return [...state, action.payload]
		},
	},
})

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer
