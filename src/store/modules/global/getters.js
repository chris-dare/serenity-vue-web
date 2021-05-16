export default {
  sideBarlinks: state => {
    return state.token ? `Bearer ${state.token}` : null
  },

  maritalStatuses: state => {
    return state.statuses.map(stat => {
      return {
        label: stat.split('_').join(' ').toLowerCase(),
        value: stat,
      }
    })
  },

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
    if (state.workspaceType === 'admin') {
      return [
        { label: 'Get Started', to: 'GetStarted', component: 'Star' },
        { label: 'Dashboard', to: 'AdminDashboard', component: 'Template' },
        { label: 'Patients', to: 'Patients', component: 'Reference', group_by: 'client care' },
        { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
        { label: 'Corporate Clients', to: 'CorporateClients', component: 'Baggage' },
        { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
        { label: 'Billing', to: 'Billing', component: 'Align', group_by: 'hospital operations'},
        { label: 'Services & pricing', to: 'Services', component: 'Wallet', group_by: 'hospital operations'},
        { label: 'Inventory', to: 'Inventory', component: 'Folder'},
        { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
        { label: 'Team', to: 'Team', component: 'Events', group_by: 'administration'},
        { label: 'Workspaces', to: 'Workspaces', component: 'Cross' },
        { label: 'Roles', to: 'Roles', component: 'Security' },
        { label: 'Locations', to: 'Locations', component: 'Categories' },
        { label: 'Settings', to: 'Settings', component: 'Settings' },
      ]
    }

    else {
      return [
        { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
        { label: 'Patients', to: 'Patients', component: 'Reference' },
        { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
        { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
        { label: 'Notifications', to: 'Notifications', component: 'Notification' },
        { label: 'Settings', to: 'Settings', component: 'Settings' },
        { label: 'Support', to: 'Support', component: 'Help' },
      ]
    }
  },
}
