export function initialState() {
  return {
    patients: [],
    patientsCount: 0,
    currentPatient: {},
    patientMedications: [],
    patientServiceRequests: [],
    patientObservations: [],
    patientDiagnosticReports: [],
  }
}

export default initialState()
