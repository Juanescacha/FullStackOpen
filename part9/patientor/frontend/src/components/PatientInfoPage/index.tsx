import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { Patient } from "../../types"

const PatientInfoPage = () => {
	const { id } = useParams()
	const [patient, setPatient] = useState<Patient>()

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const patient = await axios.get(
					`http://localhost:3001/api/patients/${id}`
				)
				setPatient(patient.data)
			} catch (error) {
				console.error("Error fetching patient data:" + error)
			}
		}

		fetchPatient()
	}, [id])

	if (patient === undefined) {
		return <p>Something went wrong...</p>
	}

	return (
		<div>
			<h1>{patient.name}</h1>
			<p>ssh: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<p>gender: {patient.gender}</p>
		</div>
	)
}

export default PatientInfoPage
