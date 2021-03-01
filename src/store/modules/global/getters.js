export default {
  sideBarlinks: state => {
    return state.token ? `Bearer ${state.token}` : null
  },

  navItems: (state) => {
    if (state.workspaceType === 'admin') {
      return [
        { label: 'Get Started', to: 'GetStarted', component: 'Star' },
        { label: 'Dashboard', to: 'AdminDashboard', component: 'Template' },
        { label: 'Patients', to: 'Patients', component: 'Reference', group_by: 'client care' },
        { label: 'Corporate Clients', to: 'Clients', component: 'Baggage' },
        { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
        { label: 'Billing', to: 'Billing', component: 'Align', group_by: 'hospital operations'},
        { label: 'Services & pricing', to: 'Billing', component: 'Wallet'},
        { label: 'Inventory', to: 'Inventory', component: 'Folder'},
        { label: 'Schedules', to: 'Schedule', component: 'Schedule'},
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
        { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
        { label: 'Notifications', to: 'Notifications', component: 'Notification' },
        { label: 'Settings', to: 'Settings', component: 'Settings' },
        { label: 'Support', to: 'Support', component: 'Help' },
      ]
    }
  },
}
