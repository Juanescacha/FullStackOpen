import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			return action.payload
		},
		removeNotification: (state, action) => {
			return initialState
		},
	},
})

export default notificationSlice.reducer
export const { setNotification, removeNotification } = notificationSlice.actions
