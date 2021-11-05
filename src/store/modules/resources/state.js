export default () => ({
  resources: [],
  specialties: [],
  categories: [],
  referenceTypes: [],
  codes: [],
  serviceTypes: [],
  currentResource: {},
  paymentMethods: [],
  encounterClasses: [],
  maritalStatuses: [],
  medicationOptions: [],
  clinicalOptions: [],
  encounterStatuses: [],
  religiousAffiliations: [],
  genders: [],
  unitTypes: [],
  interpretationTypes: [],
  examUnitTypes: [],
  socialUnitTypes: [],
  vitalsUnitTypes: [],
  languages: [],
  vendors: [],
  observationCategories: [],
  pharmacyInventory: [],
  priorities: [
    {display: 'Routine', code: 'ROUTINE'},
    {display: 'Urgent', code: 'URGENT'},
    {display: 'ASAP', code: 'ASAP'},
    {display: 'STAT', code: 'STAT'},
  ],
  bloodTypes: [ 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-' ],
  currencies: [],
  encounterPriorities: [],
  diagnosticLabProceedures: [],
  serviceGenericPeriodUnits: [],
  serviceRequestCategoryTypes: [],
  serviceRequestSectionTypes: [],
  dosageRoutes: [],
})
