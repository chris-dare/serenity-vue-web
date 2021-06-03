import Currency from './currencies'

export function initialState() {
  return {
    countries: [],
    networks: ['MTN', 'Vodafone', 'AirtelTigo'],
    workspaceType: 'OPD',
    location: '',
    workspaces: [
      {label: 'Out Patient', value:'OPD'},
      {label: 'Reception', value:'RECEPT'},
      {label: 'In Patient', value:'IPD'},
      {label: 'Pharmacy', value:'pharmacy'},
      {label: 'Diagnostics', value:'diagnostics'},
      {label: 'Billing', value:'billing'},
      {label: 'COVID-19', value:'covid-19'},
      {label: 'Virtual Care', value:'virtual-care'},
      {label: 'Admin', value:'ADMIN'},
    ],
    currencies: Currency.data,
    titles: ['Mr', 'Mrs', 'Miss', 'Hon', 'Dr', 'Prof', 'Master'],
    // genders: ['female', 'male', 'other', 'unknown'],
    religions: {
      'ADVENTIST': 'Adventist',
      'AFRICAN_RELIGIONS': 'African Religions',
      'LATTER_DAY_SAINTS': 'Latter Day Saints',
    },
    languages: {
      EN: 'English',
      FR: 'French',
    },
    units: ['Hours', 'Days', 'Weeks', 'Months', 'Years'],
    frequencies: ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly'],
    priorities: [ 'routine', 'urgent', 'asap', 'stat' ],
    // statuses: ['ANNULLED' , 'DIVORCED' , 'INTERLOCUTORY' , 'LEGALLY_SEPARATED' , 'MARRIED' , 'POLYGAMOUS' , 'NEVER_MARRIED' , 'DOMESTIC_PARTNER' , 'UNMARRIED' , 'WIDOWED' , 'UNKNOWN'],
    regions: ['Ahafo Region', 'Ashanti Region', 'Bono Region', 'Bono East Region', 'Central Region', 'Eastern Region', 'Greater Accra Region',  'North East Region',  'Northern Region', 'Oti Region', 'Savannah Region', 'Upper East Region', 'Volta Region', 'Upper West Region', 'Western North Region', 'Western Region'],
  }
}

export default initialState()
