/* eslint-disable @typescript-eslint/no-empty-interface */

export interface Diagnose {
	code: string
	name: string
	latin?: string
}

export interface Patient {
	id: string
	name: string
	ssn: string
	occupation: string
	gender: string
	dateOfBirth: string
	entries: Entry[]
}

export interface Entry {}

export type NewPatient = Omit<Patient, "id">

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">
