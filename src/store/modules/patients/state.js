export function initialState() {
  return {
    patients: [],
    patientsCount: 0,
    currentPatient: {
      payment_methods: {
        corporate: [],
      },
    },
    patientMedications: [],
    patientDiagnosis: [],
    patientNotes: [],
    patientServiceRequests: [],
    patientObservations: [],
    patientReferrals: [],
    patientCarePlans: [],
    patientsMeta: {
      page: 1,
      page_size: 10,
    },

  }
}

export default initialState()
