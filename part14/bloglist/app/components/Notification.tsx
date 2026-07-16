"use client"

import { useNotification } from "@/app/components/NotificationContext"

export default function Notification() {
	const { message, type } = useNotification()

	if (!message) return null

	return (
		<div
			className={`${type === "success" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-3 rounded-sm fixed top-5 right-5 w-100 transition-all duration-300`}
			data-testid="notification"
		>
			{message}
		</div>
	)
}
