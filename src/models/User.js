import store from '@/store'
import get from 'lodash/get'

export default class User {
  constructor(data) {
    this.data = { ...data }
  }

  getEditView() {
    const practitioner_specialty = this.data.practitioner_specialty.map(sp => sp.Display)
    let editData = renameKeys({ ...this.data, practitioner_specialty}, 
      { date_of_birth : 'birth_date', phone_number : 'mobile' })
    return editData
  }

  getUpdateView() {
    const specialties = get(store.state, 'resources.specialties')

    let practitioner_specialty = []

    if (checkArrayType(this.data.practitioner_specialty) === 'string') {
      practitioner_specialty = specialties.filter(specialty => this.data.practitioner_specialty.includes(specialty.Display))
    } else {
      practitioner_specialty = this.data.practitioner_specialty
    }

    let updateData = { ...this.data, practitioner_specialty}

    return updateData
  }

  getCreateView() {
    const practitioner_specialty = this.data.practitioner_specialty.map(sp => sp.Display)
    let createData = { ...this.data, practitioner_specialty }
    createData.practitioner_specialty.map(sp => sp.Display)
    return createData
  }
  
}

const renameKeys = (obj, keysMap) => {
  return Object.keys(obj).reduce((acc, key) => {
    const renamedObject = {
      [keysMap[key] || key]: obj[key],
    }
    return {
      ...acc,
      ...renamedObject,
    }
  }, {})
}

const checkArrayType = (obj) => {
  return typeof obj[0] === 'string' ? 'string' : 'object'
}