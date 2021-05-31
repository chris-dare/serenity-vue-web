export function initialState() {
  return {
    patients: [],
    patientsCount: 0,
    currentPatient: {},
    patientMedications: [],
    patientDiagnosis: [],
    patientNotes: [],
    patientServiceRequests: [],
    patientObservations: [],
    patientDiagnosticReports: [],
  }
}

export default initialState()
