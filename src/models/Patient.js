import isEmpty from 'lodash/isEmpty'
import differenceInYears from 'date-fns/differenceInYears'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export default class Patient {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    let data = {
      ...this.data,
      age: this.data.birth_date ? differenceInYears(Date.now(), new Date(`${this.data.birth_date}`)) : null,
      fullName: `${this.data.name_prefix || ''} ${this.data.first_name || ''} ${this.data.last_name || ''}`,
      name: `${this.data.first_name || ''} ${this.data.last_name || ''}`,
      phone: this.data.user?.mobile || '-',
      email: this.data.user?.email || '-',
      recent: format(parseISO(this.data.modified_at), 'MMM dd, yyyy'),
    }

    data.age_years = data.age ? `${data.age} years` : null
    data.gender_age_description = ''

    if (data.gender) {
      data.gender_age_description = `${data.gender}`
    }

    if (data.age_years) {
      data.gender_age_description = `${data.gender_age_description}, ${data.age_years}`
    }

    data.emergency_contact = { address: {}, telecom: {}}

    if (data.contact && data.contact.length) {
      data.emergency_contact = { ...data.contact.find(contact => contact.relationship === 'emergency_contact')  }
      data.emergency_contact.emergency_contact_address_description = this.getAddressDescription(data.emergency_contact.address)
    }

    data.payment_method = {payment_details: {}}

    if (!isEmpty(data.payment_options)) {
      data.payment_method = { ...data.payment_options[0] }
    }

    data.address_description = this.getAddressDescription(data.address)
    

    data.religion = isEmpty(data.religious_affiliation) ? '' : data.religious_affiliation[0]

    return data
  }

  getSingleView() {
    let data = {
      ...this.data,
    }

    return data
  }

  getCreateView() {
    let data = { ...patient, ...this.data }

    if (isEmpty(data.address)) {
      delete data.address
    } else {
      data.address = { ...address, ...this.data.address }
    }

    if (data.contact) {
      if (this.isContactEmpty(data.contact[0])) {
        delete data.contact
      } else {
        data.contact[0] = { ...contact, ...this.data.contact[0] }
      }
    }

    if (data.payment_options) {
      if (this.isContactEmpty(data.payment_options[0])) {
        delete data.payment_options
      } else {
        data.payment_options[0] = { ...payment_options, ...this.data.payment_options[0] }
      }
    }

    if (data.mobile) {
      data.mobile = this.convertToMsisdn(data.mobile)
    }

    if (data.marital_status) {
      data.marital_status = data.marital_status.value
    }
    if (data.religious_affiliation) {
      data.religious_affiliation = [data.religious_affiliation.value]
    }

    data.gender = data.gender.toUpperCase()

    return this.removeEmpty(data)
  }

  isContactEmpty(contact) {
    return (isEmpty(contact.address) && isEmpty(contact.telecom) && Object.keys(contact).length === 3) 
  }

  convertToMsisdn(number) {
    if (!number) {
      return ''
    }

    return number.slice(1, number.length - 1)
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

const address = {
  'use': 'home',
  'type': 'both',
  'line': '',
  'state': '',
  'city': '',
  'district': '',
  'postalCode': '', 
  'country': '',
}

const contact = {
  'relationship': 'emergency_contact', //required: emergency_contact | next_of_kin
  'first_name': '', //required
  'last_name': '', // required
  'other_names': '', // optional
  'telecom': { //required 
    'system': '', // default for patient onboarding
    'value': '', //required: phone number
    'use': '', // home (default) | mobile -> purpose of this contact point
  },
  'address': { // required
    'line': '',
  },
}

const payment_options = {
  'payment_type': 'momo', // options: cash | momo | insurance | corporate | card
  'payer': 'corporate', // corporate, insurance or user id
  'payment_details': { // for momo
    'payment_provider': 'MTN',
    'country': 'GH',
    'msisdn': '',
  },
}

const patient = {
  'mr_number': null,
  'birth_date': null,
  'birth_time': null,
  'preferred_communication': ['en'],
  'email': '',
  'first_name': '', // required
  'gender': '', // required: male | female | other | unknown
  'general_practitioner': '', // practitioner role id
  'last_name': '',
  'meta': null,
  'mobile': '', // required: msisdn phone number format
  'name_prefix': 'Prof',
  'religious_affiliation': null, // will provider an endpoint to retrieve list
}