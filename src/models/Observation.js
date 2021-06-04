// const STATUS = [ 'registered', 'preliminary', 'final', 'amended' ]
// const CATEGORY = [ social-history, vital-signs, imaging, laboratory, procedure, survey, exam, therapy, activity ]

// import isEmpty from 'lodash/isEmpty'

export default class Observation {
  constructor(data) {
    this.data = { ...data }
  }

  getCreateVitalsView(encounter, patient) {
    let createData = []

    Object.keys(this.data).forEach(vital => {
      createData.push({
        observation_category: [{display: 'vital-signs'}],
        value: this.data[vital],
        unit: vital,
        status: 'registered',
        patient: patient,
        encounter: encounter.id,
      })
    })
    
    return createData
  }

  getCreateObservationView(encounter, patient, field, value, category = 'social-history') {
    let createData = {
      observation_category: [{display: category}],
      value: value,
      unit: field,
      status: 'registered',
      patient: patient,
      encounter: encounter.id,
    }
    
    return createData
  }

  getCreateMultipleObservationView(encounter, patient, category = 'social-history') {
    let createData = []

    Object.keys(this.data).forEach(vital => {
      createData.push({
        observation_category: [{display: category}],
        value: this.data[vital],
        unit: vital,
        status: 'registered',
        patient: patient,
        encounter: encounter.id,
      })
    })
    
    return createData
  }

  getCreateMultipleHistoryView(encounter, patient, category = 'social-history') {
    let createData = []

    Object.keys(this.data).forEach(history => {
      this.data[history].forEach(his => {
        createData.push({
          observation_category: [{display: category}],
          value: his.code,
          unit: history,
          status: 'registered',
          patient: patient,
          encounter: encounter.id,
        })
      })
      
    })
    
    return createData
  }

  getAllergiesView(encounter, patient) {
    let createData = {
      type: 'ALLERGY',
      code: this.data.code,
      patient: patient,
      encounter: encounter.id,
    }
    
    return createData
  }
}