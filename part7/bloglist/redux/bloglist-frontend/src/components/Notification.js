import { useSelector } from "react-redux"

const Notification = () => {
	const message = useSelector(state => state.notification)
	return message[0] && <div className={message[1]}>{message[0]}</div>
}

export default Notification
