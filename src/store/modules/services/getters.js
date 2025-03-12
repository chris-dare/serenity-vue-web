import Vue from 'vue'

export default {
  normalizedServices: (state) => {
    return state.services.map(service => {
      service.locations = service.healthcare_service_locations?.map(location => location.display || location.location_name).join(', ') || '-'
      service.required = service.healthcare_service_appointment_required ? 'Yes' : 'No'
      service.virtual = service.virtual_service ? 'Yes' : 'No'
      service.available_days = service.healthcare_service_available_times?.[0]?.daysOfWeek.join(', ') || '-'
      service.description = service.healthcare_service_not_available_times?.[0]?.description || '-'
      service.unavailable_times = ''
      service.categories = service.healthcare_service_categories?.[0]?.text || '-'
      service.types = service.healthcare_service_types?.map(type => type.text).join(', ') || '-'
      service.specialties = service.healthcare_service_specialties?.map(specialty => specialty.display).join(', ') || '-'
      service.duration = service.slot_duration && service.healthcare_service_appointment_required ? service.slot_duration : 0

      if (service.healthcare_service_not_available_times?.length) {
        service.unavailable_times = `${Vue.prototype.$date.formatDate(service.healthcare_service_not_available_times[0].start_date, 'dd MMM, yyyy')} - ${Vue.prototype.$date.formatDate(service.healthcare_service_not_available_times[0].end_date, 'dd MMM, yyyy')}`
      }

      service.healthcare_service_available_times?.forEach(serve => {
        serve.availableStartTime = serve.availableStartTime.includes('Z') ? serve.availableStartTime.slice(0, -1) : serve.availableStartTime
        serve.availableEndTime = serve.availableEndTime.includes('Z') ? serve.availableEndTime.slice(0, -1) : serve.availableEndTime
      })

      service.available_times = service.healthcare_service_available_times?.[0] ? `${service.healthcare_service_available_times[0].availableStartTime || 0} - ${service.healthcare_service_available_times[0].availableEndTime || 0}` : '-'

      return service
    })
  },

  labProceedures: (state, getters) => {
    if (!getters.normalizedServices) return []
    return getters.normalizedServices.filter(service => service.healthcare_service_categories[0]?.text === 'Diagnostic')
  },

  consultationServices: (state, getters) => {
    if (!getters.normalizedServices) return []
    return getters.normalizedServices.filter(service => service.service_class === 'Consultation')
  },

  wards: (state) => state.wards,
}