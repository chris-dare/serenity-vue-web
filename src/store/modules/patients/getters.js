import Patient from '@/models/Patient'
export default {
  patients: state => {
    return state.patients.map(pat => {
      const patient = new Patient(pat).getNormalizedView()
      return patient
    })
  },
}
