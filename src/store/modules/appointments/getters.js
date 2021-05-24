import isSameDay from 'date-fns/isSameDay'
import isWithinInterval from 'date-fns/isWithinInterval'
import Vue from 'vue'
import Appointment from '@/models/Appointment'

export default {
  appointments: (state) => {
    return state.appointments.map((appoint => new Appointment(appoint).getNormalizedView()))
  },

  navItems: () => {
    return[
      { label: 'Select patient', description: 'Existing or new patient', path: 'SelectPatient', completed: false, slug: 'select-patient'},
      { label: 'Clinics, Services', description: 'Choose service', path: 'ClinicsServices', completed: false, slug: 'clinics'},
      { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 'DateDoctor', completed: false, slug: 'doctor'},
      //   { label: 'Payment', description: 'How patient makes payment', path: 'AppointmentPayment', completed: false, slug: 'payment'},
      { label: 'Notes', description: 'Any notes to take', path: 'AppointmentNotes', completed: false, slug: 'notes'},
      { label: 'Summary', description: 'Overview of appointment', path: 'AppointmentSummary', completed: false, slug: 'overview'},
    ]
  },

  slots: (state, getters, rootState, rootGetters) => {
    return state.slots.map(slot => {
      const practitioner = rootGetters['practitioners/practitioners'].find(a => a.id === slot.practitionerid)
      
      slot.practitioner = practitioner ? practitioner : { practitioner_specialty: []}
      slot.slot = `${Vue.prototype.$date.formatDate(slot.start, 'hh:mm a')} - ${Vue.prototype.$date.formatDate(slot.end, 'hh:mm a')}`
      return slot
    })
  },

  availableSlots: (state, getters, rootState, rootGetters) => (date, time = null) => {
    let slots = state.slots.filter(slot => isSameDay(new Date(slot.start), new Date(date)))
  
    if (time) {
      const dateTime = new Date(`${Vue.prototype.$date.formatDate(date, 'MM dd, yyyy')} ${time}`)
      slots = state.slots.filter(slot => isWithinInterval(dateTime, {
        start: new Date(slot.start),
        end: new Date(slot.end),
      }))
    }

    return slots.map(slot => {
      const practitioner = rootGetters['practitioners/practitioners'].find(a => a.id === slot.practitionerid)
      
      slot.practitioner = practitioner ? practitioner : { practitioner_specialty: []}
      slot.slot = `${Vue.prototype.$date.formatDate(slot.start, 'hh:mm a')} - ${Vue.prototype.$date.formatDate(slot.end, 'hh:mm a')}`
      return slot
    })
  },

  patientAppointments: (state, getters) => (id) => {
    return getters.appointments.filter(appointment => appointment.patient.id === id)
  },
}
