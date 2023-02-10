import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SHOW":
			return action.data
		case "HIDE":
			return ""
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	)

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{children}
		</NotificationContext.Provider>
	)
}

// helpers

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext)
	return notificationAndDispatch[1]
}

export default NotificationContext
