import Vue from 'vue'
import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
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
      slot: this.formatSlotData(this.data.slot, this.data.practitioner),
      date: Vue.prototype.$date.formatDate(this.data.slot.start),
      service_tier: this.formatServiceTierData(this.data.service_tier),
      isCancelled: this.data.status === 'cancelled',
      isPending: this.data.status === 'pending',
      isPast: isAfter(Date.now(), parseISO(this.data.slot.end)),
      healthcare_service_name: this.data.Healthcareservice?.healthcare_service_name,
      patient_name: this.data.patient?.full_name,
    }

    return data
  }

  getCreateView() {
    let createData = { }
    
    createData.comment = this.data.comment || ''
    createData.appointmentType = this.data.appointmentType || 'ROUTINE'
    createData.healthcareservice_id = this.data.service.id
    createData.slot_id = this.data.slot ? this.data.slot.id : null
    createData.patient_id = this.data.patient ? this.data.patient.id : null
    createData.service_tier = this.data.service_tier ? this.data.service_tier.value : null
    // createData.patient_id = '471d2637-56c4-420e-bde6-1489c3b93c79'
    
    return createData
  }

  getUpdateView() {
    let updateData = { }
    
    updateData.comment = this.data.comment || ''
    updateData.appointmentType = this.data.appointmentType || 'ROUTINE'
    updateData.slot_id = this.data.slot ? this.data.slot.id : null
    
    return updateData
  }

  getRescheduleView() {
    let updateData = { }
    
    updateData.comment = this.data.comment || ''
    updateData.slot_id = this.data.slot ? this.data.slot.id : null
    
    return updateData
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
      value: data.name,
    }
  }

  formatPatientData(data) {
    return {
      ...data,
      phone: data.telephone,
      fullName: data.full_name,
      name: data.full_name,
    }
  }

  formatSlotData(data, practitioner) {
    return {
      ...data,
      date: `${Vue.prototype.$date.formatDate(data.start, 'dd MMM')}`,
      slot: `${ Vue.prototype.$date.formatDate(data.start, 'HH:mm a') } - ${ Vue.prototype.$date.formatDate(data.end, 'HH:mm a') }`,
      practitioner: this.formatPatientData(practitioner),
    }
  }
}