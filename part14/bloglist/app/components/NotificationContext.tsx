"use client"

import { createContext, type ReactNode, useContext, useState } from "react"

type NotificationType = "success" | "error"

type NotificationContextType = {
	message: string
	type: NotificationType
	showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
	message: "",
	type: "success",
	showNotification: () => {},
})

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [message, setMessage] = useState("")
	const [type, setType] = useState<NotificationType>("success")

	const showNotification = (
		mesg: string,
		notifType: NotificationType = "success",
	) => {
		setMessage(mesg)
		setType(notifType)
		setTimeout(() => setMessage(""), 5000)
	}

	return (
		<NotificationContext value={{ message, type, showNotification }}>
			{children}
		</NotificationContext>
	)
}

export const useNotification = () => useContext(NotificationContext)
