import Vue from 'vue'
export default class Appointment {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    let data = {
      ...this.data,
      patient: this.formatPatientData(this.data.patient),
      practitioner: this.formatPatientData(this.data.practitioner),
      service: this.formatServiceData(this.data.Healthcareservice),
      slot: this.formatSlotData(this.data.slot),
      service_tier: this.formatServiceTierData(this.data.service_tier),
      isCancelled: this.data.status === 'cancelled',
      isPending: this.data.status === 'pending',
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
    // createData.patient_id = 'f45195f3-05f6-4adf-985c-63acb648a688'
    
    return createData
  }

  formatServiceData(data) {
    return {
      ...data,
      categories: data.healthcare_service_category,
    }
  }
  formatServiceTierData(data) {
    return {
      ...data,
      label: `${data.name} - ${data.currency} ${data.cost}`,
    }
  }

  formatPatientData(data) {
    return {
      ...data,
      phone: data.telephone,
      fullName: data.full_name,
    }
  }

  formatSlotData(data) {
    return {
      ...data,
      date: `${Vue.prototype.$date.formatDate(data.start, 'dd MMM')}`,
      slot: `${ Vue.prototype.$date.formatDate(data.start, 'HH:mm a') } - ${ Vue.prototype.$date.formatDate(data.end, 'HH:mm a') }`,
    }
  }
}