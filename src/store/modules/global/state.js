export function initialState() {
  return {
    countries: [],
    networks: ['MTN', 'Vodafone', 'AirtelTigo'],
    workspaceType: 'admin',
    workspaces: [
      {label: 'Out Patient', value:'out-patient'},
      {label: 'Reception', value:'reception'},
      {label: 'In Patient', value:'in-patient'},
      {label: 'Pharmacy', value:'pharmacy'},
      {label: 'Diagnostics', value:'diagnostics'},
      {label: 'Billing', value:'billing'},
      {label: 'COVID-19', value:'covid-19'},
      {label: 'Virtual Care', value:'virtual-care'},
      {label: 'Admin', value:'admin'},
    ],
  }
}

export default initialState()
