import patientsData from "../data/patients"
import { NewPatient, NonSensitivePatient, Patient } from "../types"
import { v1 as uuid } from "uuid"

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

const addPatient = (entry: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...entry,
	}

	patients.push(newPatient)
	return newPatient
}

const getPatient = (id: string): NonSensitivePatient | undefined => {
	return patients.find(patient => patient.id === id)
}

export default {
	getEntries,
	getPatient,
	addPatient,
}
