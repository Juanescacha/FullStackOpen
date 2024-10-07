import express from "express"

import patientService from "../services/patientService"
import { toNewPatient } from "../utils"

const router = express.Router()

router.get("/", (_req, res) => {
	res.json(patientService.getEntries()).status(200)
})

router.post("/", (req, res) => {
	try {
		const newPatient = toNewPatient(req.body)

		const addedPatient = patientService.addPatient(newPatient)

		res.json(addedPatient)
	} catch (error: unknown) {
		let errorMessage = "Something went wrong"
		if (error instanceof Error) {
			errorMessage += " Error: " + error.message
		}
		res.status(400).send(errorMessage)
	}
})

router.get("/:id", (req, res) => {
	const id = req.params.id
	const patient = patientService.getPatient(id)
	if (patient) {
		res.json(patient).status(200)
	} else {
		res.status(404).send("Patient not found")
	}
})

export default router
