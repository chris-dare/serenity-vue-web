/* eslint-disable no-unused-vars */
import isEmpty from 'lodash/isEmpty'
import differenceInYears from 'date-fns/differenceInYears'

export default class Patient {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    let data = {
      ...this.data,
      age: this.data.birth_date ? differenceInYears(Date.now(), new Date(`${this.data.birth_date}`)) : null,
      phone: this.data.user?.mobile || '-',
      email: this.data.user?.email || '-',
    }

    data.age_years = data.age ? `${data.age} years` : null
    data.gender_age_description = ''

    if(data.user && typeof data.user === 'object'){
      data.email = data.user.email
      data.mobile = data.user.mobile
      data.fullName = `${data.user.name_prefix || ''} ${data.user.first_name || ''} ${data.user.last_name || ''}`
      data.name = `${data.user.first_name || ''} ${data.user.last_name || ''}`
    } else {
      data.fullName = `${data.name_prefix || ''} ${data.first_name || ''} ${data.last_name || data.lastname || ''}`
      data.name = `${data.first_name || ''} ${data.last_name || ''}`
    }

    if (data.gender) {
      data.gender_age_description = `${data.gender}`
    }

    if (data.age_years) {
      data.gender_age_description = `${data.gender_age_description}, ${data.age_years}`
    }

    data.emergency_contact = { address: {}, telecom: {}}

    if (data.patient_related_person && data.patient_related_person.length) {
      data.emergency_contact = { ...data.patient_related_person.find(contact => contact.relationship === 'EMERGENCY_CONTACT')  }
      data.emergency_contact.emergency_contact_address_description = this.getAddressDescription(data.emergency_contact.address)

      data.patient_related_person[0].preferred_communication = data.patient_related_person[0].related_person_communication[0]?.language

    } else {
      data.patient_related_person = [{}]
    }

    if (isEmpty(data.patient_top_up_payment_methods)) {
      data.patient_top_up_payment_methods = [{}]
    }

    data.payment_method = {}

    if (!isEmpty(data.payment_methods)) {
      data.payment_method = data.payment_methods.patient_user.length ? { ...data.payment_methods.patient_user[0] } : {}
    }

    if (!isEmpty(data.patient_communication)) {
      data.language = data.patient_communication[0].language
    }

    data.address_description = this.getAddressDescription(data.patient_address)

    data.religious_affiliation = isEmpty(data.religious_affiliation) ? '' : data.religious_affiliation[0]

    data.patient_address = data.patient_address || {}

    return data
  }

  getCreateView() {
    let data = { ...this.data }

    if (data.email) {
      data.email = data?.email?.toLowerCase()
    }

    if (data.religious_affiliation) {
      data.religious_affiliation = [data.religious_affiliation]
    }

    // if (data.address) {
    //   data.address = [{...data.address, use: 'home', type: 'both'}]
    // }

    if (data.patient_communication) {
      data.patient_communication = [{
        language: data.patient_communication,
        preferred: true,
      }]
    }

    return this.removeEmpty(data)
  }

  getUpdateView() {
    let data = { ...this.data }

    data.religious_affiliation = data.religious_affiliation ? [data.religious_affiliation] : []

    // if (data.address) {
    //   data.address = [data.address]
    // }

    if (typeof data.patient_communication === 'string') {
      data.patient_communication = [{
        language: data.patient_communication,
        preferred: true,
      }]
    }

    this.removeEmpty(data)

    data.religious_affiliation = data.religious_affiliation || []

    return data
  }

  isContactEmpty(contact) {
    return (isEmpty(contact.address) && isEmpty(contact.telecom) && Object.keys(contact).length === 3)
  }

  convertToMsisdn(number) {
    if (!number) {
      return ''
    }

    return number.slice(1, number.length)
  }

  convertFromMsisdn(number) {
    if (!number) {
      return ''
    }

    return `+${number}`
  }

  getAddressDescription(address) {
    if (!address) return ''

    return [address.line,address.city, address.district, address.state, address.country ].filter(name => name).join(', ')
  }

  removeEmpty(tree) {
    Object
      .entries(tree)
      .forEach(([k, v]) => {
        if (v && typeof v === 'object') {
          this.removeEmpty(v)
        }
        if (v && typeof v === 'object' && !Object.keys(v).length || v === null || v === undefined) {
          if (Array.isArray(tree)) {
            tree.splice(k, 1)
          } else {
            delete tree[k]
          }
        }
      })
    return tree
  }
}
