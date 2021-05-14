import store from '@/store'
export default class Appointment {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    let data = {
      ...this.data,
      patient: this.getPatient(this.data.patient),
      practitioner: this.getPractioner(this.data.practitioner),
      service: this.getService(this.data.Healthcareservice),
      isCancelled: this.data.status === 'cancelled',
      isPending: this.data.status === 'pending',
      slot: null,
    }

    return data
  }

  getCreateView() {
    let createData = { }
    
    createData.comment = this.data.comment || ''
    createData.appointmentType = this.data.appointmentType.value || 'ROUTINE'
    createData.healthcareservice_id = this.data.service.id
    createData.slot_id = this.data.slot ? this.data.slot.id : null
    createData.patient_id = this.data.patient ? this.data.patient.id : null
    createData.service_tier = this.data.service_tier ? this.data.service_tier.value : null
    // createData.patient_id = 'f45195f3-05f6-4adf-985c-63acb648a688'
    
    return createData
  }

  getPatient(id) {
    const patients = store.getters['patients/patients']

    return patients ? patients.find(pat => pat.id === id) : null
  }

  getService(id) {
    const services = store.getters['services/normalizedServices']

    return services ? services.find(pat => pat.id === id) : null
  }

  getPractioner(id) {
    const practitioners = store.getters['practitioners/practitioners']

    return practitioners ? practitioners.find(pat => pat.id === id) : null
  }
}