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
        code: vital,
        status: 'registered',
        patient: patient,
        encounter: encounter.id,
      })
    })

    // if (!isEmpty(encounter)) {
    //   createData.encounter = encounter.id
    // }
    
    return createData
  }
}