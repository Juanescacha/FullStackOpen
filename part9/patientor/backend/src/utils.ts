import { NewPatient } from "./types"

export const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data: " + object)
	}

	if (
		"name" in object &&
		"dateOfBirth" in object &&
		"ssn" in object &&
		"gender" in object &&
		"occupation" in object
	) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDateOfBirth(object.dateOfBirth),
			ssn: parseSSN(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		}

		return newPatient
	}

	throw new Error("Incorrect data: some fields are missing")
}

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error("Incorrect or missing name: " + name)
	}
	return name
}

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String
}

const parseDateOfBirth = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing dateOfBirth: " + date)
	}
	return date
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date))
}

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error("Incorrect or missing ssn: " + ssn)
	}
	return ssn
}

const parseGender = (gender: unknown): string => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender)
	}

	return gender
}

const isGender = (gender: string): boolean => {
	return ["male", "female"].includes(gender)
}

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation: " + occupation)
	}
	return occupation
}
