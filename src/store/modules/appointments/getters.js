import isSameDay from 'date-fns/isSameDay'
import isWithinInterval from 'date-fns/isWithinInterval'
import Vue from 'vue'

export default {
  appointments: (state) => {
    return state.appointments.map(app => {
      app.isCancelled = app.status === 'cancelled',
      app.isPending = app.status === 'pending',
      app.patient = {
        id: app.patient_id,
        age: app.patient_age,
        fullName: app.patient_full_name,
        gender: app.patient_gender,
        phone: app.patient_mobile,
      }
      app.service = {
        categories: '',
        healthcare_service_name: app.healthcare_service_name,
        id: app.healthcare_service_id,
      }
      app.practitioner = {
        fullName: app.slot_practitioner_name,
      }
      app.service_tier = {
        ...app.service_tier,
        label: `${app.service_tier.display} - ${app.service_tier.currency} ${app.service_tier.charge}`,
      }
      app.slot = {
        start: app.slot_start,
        end: app.slot_end,
        practitioner: {},
      }
      return app
    })
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

  slots: (state) => state.slots,

  // eslint-disable-next-line no-unused-vars
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
      // const practitioner = rootGetters['practitioners/practitioners'].find(a => a.id === slot.practitionerid)

      // slot.practitioner = practitioner ? practitioner : { practitioner_specialty: []}
      slot.slot = `${Vue.prototype.$date.formatDate(slot.start, 'hh:mm a')} - ${Vue.prototype.$date.formatDate(slot.end, 'hh:mm a')}`
      return slot
    })
  },

  getPatientAppointment: (state, getters) => (appointmentId) => {
    return getters.appointments.filter(appointment => appointment.id === appointmentId)
  },

  patientAppointments: (state, getters) => (id) => {
    const apps = id ? getters.appointments.filter(appointment => appointment.patient.id === id) : getters.appointments
    return Vue.prototype.$date.sortByDate(apps, 'start', 'asc')
  },

  patientNextAppointment: (state, getters) => {
    if (!getters.patientAppointments() && !getters.patientAppointments().length) return {}
    return getters.patientAppointments()[0]
  },
}
