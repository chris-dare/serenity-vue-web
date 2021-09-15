/* eslint-disable no-unused-vars */
export default {
  corporateAccounts: (state) => {
    if (!state.patientAccounts) return []
    return state.patientAccounts?.corporate || []
  },

  userAccounts: (state) => {
    if (!state.patientAccounts) return []
    return state.patientAccounts?.patient_user || []
  },

  hasNoAccount: (state, getters) =>{
    return !getters.userAccounts.length && !getters.corporateAccounts.length
  },

  totalUserBalance: (state, getters) => getters.userAccounts.reduce((acc, el) => {return acc + parseFloat(el.balance)}, 0),

  getStatusVariant: (state) => (status) => {
    if (status === 'billable' || status === 'CREATED') {
      return 'primary'
    }

    if (status === 'aborted' || status === 'WITHDRAWN') {
      return 'error'
    }

    return 'success'
  },
}
