import { createSlice } from "@reduxjs/toolkit"

const initialState = ["", "success"]

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			return action.payload
		},
		clearNotification: (state, action) => {
			return initialState
		},
	},
})

export const setNotificationTimeout = (message, type, timeout) => {
	return async dispatch => {
		dispatch(setNotification([message, type]))
		setTimeout(() => {
			dispatch(clearNotification())
		}, timeout)
	}
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
