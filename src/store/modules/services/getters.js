export default {
  normalizedServices: (state) => {
    return state.services.map(service => {
      service.locations= service.healthcare_service_locations && service.healthcare_service_locations.length ? service.healthcare_service_locations.map(service => service.display || service.location_name).join(', ') : '-'
      service.required= service.healthcare_service_appointment_required ? 'Yes' : 'No'
      service.virtual= service.virtual_service ? 'Yes' : 'No'
      service.available_times= service.healthcare_service_available_times && service.healthcare_service_available_times.length ? `${service.healthcare_service_available_times[0].availableStartTime || 0} - ${service.healthcare_service_available_times[0].availableEndTime || 0} ` : '-'
      service.available_days= service.healthcare_service_available_times && service.healthcare_service_available_times.length ? service.healthcare_service_available_times[0].daysOfWeek.join(', ') : '-'
      service.description= service.healthcare_service_not_available_times && service.healthcare_service_not_available_times.length ? service.healthcare_service_not_available_times[0].description :'-'
      service.unavailable_times= ''
      service.categories= service.healthcare_service_categories ? service.healthcare_service_categories.map(service => service.text).join(', ') : '-'
      service.types= service.healthcare_service_types ? service.healthcare_service_types.map(service => service.text).join(', ') : '-'
      service.specialties= service.healthcare_service_specialties ? service.healthcare_service_specialties.map(service => service.Display).join(', ') : '-'
      service.duration= service.slot_duration ? service.slot_duration : 0
              
        
      if (service.healthcare_service_not_available_times && service.healthcare_service_not_available_times.length && service.healthcare_service_not_available_times[0].during) {
        service.unavailable_times = `${service.healthcare_service_not_available_times[0].during.start || 0} - ${service.healthcare_service_not_available_times[0].during.end || 0}`
      }

      return service
    })
  },
}
