import Workspaces from './workspaces'
export default {
  sideBarlinks: state => {
    return state.token ? `Bearer ${state.token}` : null
  },

  // maritalStatuses: state => {
  //   return state.statuses.map(stat => {
  //     return {
  //       label: stat.split('_').join(' ').toLowerCase(),
  //       value: stat,
  //     }
  //   })
  // },

  genders: state => {
    return state.genders.map(gender => {
      return {
        label: gender,
        value: gender.toUpperCase(),
      }
    })
  },

  religions: state => {
    let religions = []
    Object.keys(state.religions).forEach(element => {
      religions.push({ value: element, label: state.religions[element] })
    })
    return religions
  },
  languages: state => {
    let languages = []
    Object.keys(state.languages).forEach(element => {
      languages.push({ value: element, label: state.languages[element] })
    })
    return languages
  },

  navItems: (state) => {
    return Workspaces.data[state.workspaceType]
  },

  currentWorkspacePatientPage: (state) => {
    if (state.workspaceType === 'BILL') {
      return 'Billing:Patient'
    }

    if (state.workspaceType === 'PHARM') {
      return 'Pharmacy:PatientSummary'
    }

    if (state.workspaceType === 'DIAG') {
      return 'Diagnostic:Patient'
    }

    return 'PatientSummary'
  },
}
