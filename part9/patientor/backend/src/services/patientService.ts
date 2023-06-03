import patientsData from "../data/patients"
import { NonSensitivePatient } from "../types"

const patients: NonSensitivePatient[] = patientsData

const getEntries = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}))
}

export default {
	getEntries,
}
