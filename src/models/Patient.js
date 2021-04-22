import isEmpty from 'lodash/isEmpty'
import Vue from 'vue'

export default class Patient {
  constructor(data) {
    this.data = { ...data }
  }

  getEmptyView() {
    let data = { ...patient, ...this.data }

    console.log('data', data)

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

    data.marital_status = data.marital_status.value

    console.log('Vue', Vue.$utils)

    return this.removeEmpty(data)
  }

  isContactEmpty(contact) {
    return (isEmpty(contact.address) && isEmpty(contact.telecom) && Object.keys(contact).length === 3) 
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
  'mr_number': '',
  'birth_date': '',
  'birth_time': null,
  'preferred_communication': ['en'],
  'email': '',
  'first_name': '', // required
  'gender': '', // required: male | female | other | unknown
  'general_practitioner': '', // practitioner role id
  'last_name': '',
  'marital_status': '',
  'meta': null,
  'mobile': '', // required: msisdn phone number format
  'name_prefix': 'Prof',
  'name_suffix': '',
  'other_names': '',
  'religious_affiliation': null, // will provider an endpoint to retrieve list
}