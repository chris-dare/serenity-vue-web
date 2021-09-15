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
    patientReferrals: [],
    patientsMeta: {
      page: 1,
      page_size: 10,
    },

  }
}

export default initialState()
