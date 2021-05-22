export default {
  data: {
    RECEPT: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    ADMIN: [
      { label: 'Get Started', to: 'GetStarted', component: 'Star' },
      { label: 'Dashboard', to: 'AdminDashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference', group_by: 'client care' },
      // { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
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
    ],
    OPD: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference' },
      { label: 'Visits', to: 'Visits', component: 'Medical' },
      { label: 'Orders', to: 'Orders', component: 'Medical' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Case Management forms', to: 'Reports', component: 'Schedule' },
      { label: 'Billing', to: 'Billing', component: 'Align'},
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    VIRT: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference' },
      { label: 'Visits', to: 'Visits', component: 'Medical' },
      { label: 'Orders', to: 'Orders', component: 'Medical' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Case Management forms', to: 'Reports', component: 'Schedule' },
      { label: 'Billing', to: 'Billing', component: 'Align'},
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    HOME: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference' },
      { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
      { label: 'Visits', to: 'Visits', component: 'Medical' },
      { label: 'Orders', to: 'Orders', component: 'Medical' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Case Management forms', to: 'Reports', component: 'Schedule' },
      { label: 'Billing', to: 'Billing', component: 'Align'},
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    BILL: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Billing:Patients', component: 'Reference' },
      { label: 'Bills', to: 'Billing', component: 'Align'},
      { label: 'Corporate Clients', to: 'CorporateClients', component: 'Baggage' },
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    PHARM: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Pharmacy:Patients', component: 'Reference' },
      { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
      { label: 'Visits', to: 'Visits', component: 'Medical' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Bills', to: 'Billing', component: 'Align'},
      { label: 'Inventory', to: 'Inventory', component: 'Folder'},
      { label: 'Corporate Clients', to: 'CorporateClients', component: 'Baggage' },
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    COVID: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Patients', component: 'Reference' },
      { label: 'Pharmacy', to: 'Pharmacy', component: 'Medication' },
      { label: 'WHO forms', to: 'Visits', component: 'Medical' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Bills', to: 'Billing', component: 'Align'},
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    DIAG: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Patients', to: 'Diagnostic:Patients', component: 'Reference'},
      { label: 'Orders', to: 'Orders', component: 'Medical' },
      { label: 'Reports', to: 'Reports', component: 'Report' },
      { label: 'Appointments', to: 'Appointments', component: 'Schedule' },
      { label: 'Case Management forms', to: 'Reports', component: 'Schedule' },
      { label: 'Schedules', to: 'Schedules', component: 'Schedule'},
      { label: 'Notifications', to: 'Notifications', component: 'Notification' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    IPD: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    MOM: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
    EMERG: [
      { label: 'Dashboard', to: 'Dashboard', component: 'Template' },
      { label: 'Support', to: 'Support', component: 'Help' },
      { label: 'Settings', to: 'Settings', component: 'Settings' },
    ],
  },
}