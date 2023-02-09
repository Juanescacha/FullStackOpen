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

export const setNotificationTime = (notification, time) => {
	return async dispatch => {
		dispatch(setNotification(notification))
		setTimeout(() => {
			dispatch(removeNotification())
		}, time * 1000)
	}
}

export default notificationSlice.reducer
export const { setNotification, removeNotification } = notificationSlice.actions
