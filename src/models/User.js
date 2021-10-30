import store from '@/store'
import get from 'lodash/get'
import omit from 'lodash/omit'

export default class User {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    return {
      ...this.data,
      fullName: `${this.data.title || ''} ${this.data.first_name || ''} ${this.data.last_name || ''}`,
      specialties: this.data.practitioner_specialty?.join(', '),
      role: this.data.practitioner_role?.name,
    }
  }
  // TODO: rework this
  getEditView() {
    const practitioner_specialty = this.data.practitioner_specialty.map(sp => sp.code)
    let editData = renameKeys({ ...this.data, practitioner_specialty},
      { date_of_birth : 'birth_date', phone_number : 'mobile', practitioner_type: 'team_member_type' })
    return omit(editData, ['country_code'])
  }

  getUpdateView() {
    const specialties = get(store.state, 'resources.specialties')

    let practitioner_specialty = []

    if (checkArrayType(this.data.practitioner_specialty) === 'string') {
      practitioner_specialty = specialties.filter(specialty => this.data.practitioner_specialty.includes(specialty.code))
    } else {
      practitioner_specialty = this.data.practitioner_specialty
    }

    let updateData = { ...this.data, practitioner_specialty}

    return updateData
  }

  getCreateView() {
    const practitioner_specialty = this.data.practitioner_specialty.map(sp => sp.code)
    let createData = { ...user, ...this.data, practitioner_specialty }
    createData.practitioner_specialty.map(sp => sp.code)
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
  if (!obj) return
  return typeof obj[0] === 'string' ? 'string' : 'object'
}



// eslint-disable-next-line no-unused-vars
const user = {
  'team_member_type': 'clinical_staff',
}
