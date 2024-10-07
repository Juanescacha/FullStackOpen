import diagnosesData from "../data/diagnoses"
import { Diagnose } from "../types"

const diagnoses: Diagnose[] = diagnosesData

const getEntries = (): Diagnose[] => {
	return diagnoses
}

export default {
	getEntries,
}
