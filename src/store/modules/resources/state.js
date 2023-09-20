import religions from '@/libs/religions'
import languages from '@/libs/languages'
// import diagOrderTypes from '@/libs/diagOrderTypes'
import diagServiceActionType from '@/libs/diagServiceActionType'
import specialties from '@/libs/specialties'

export default () => ({
  resources: [],
  specialties,
  categories: [
    {
      code: 'Consultation',
      display: 'Consultation',
    },
    {
      code: 'Diagnostic',
      display: 'Diagnostic',
    },
    {
      code: 'Hospitalization',
      display: 'Hospitalization',
    },
    {
      code: 'Medication',
      display: 'Medication',
    },
  ],
  referenceTypes: [],
  codes: [
    {
      code: 'free',
      display_text: 'Free',
    },
    {
      code: 'disc',
      display_text: 'Discounts Available',
    },
    {
      code: 'cost',
      display_text: 'Fees apply',
    },
  ],
  serviceTypes: [
    {
      code: 'Adoption/Permanent Care Info/Support',
      display: 'Adoption & permanent care information/support',
    },
    {
      code: 'Aged Care Assessment',
      display: 'Aged Care Assessment',
    },
    {
      code: 'Aged Care Information/Referral',
      display: 'Aged Care information/referral',
    },
    {
      code: 'Aged Residential Care',
      display: 'Aged Residential Care',
    },
    {
      code: 'General Care',
      display: 'General Care',
    },
  ],
  revenueTags: [],
  currentResource: {},
  paymentMethods: [],
  encounterClasses: [],
  maritalStatuses: [
    {
      code: 'ANNULLED',
      display: 'Annulled',
    },
    {
      code: 'DIVORCED',
      display: 'Annulled',
    },
    {
      code: 'INTERLOCUTORY',
      display: 'Interlocutory',
    },
    {
      code: 'LEGALLY_SEPARATED',
      display: 'Interlocutory',
    },
    {
      code: 'MARRIED',
      display: 'Married',
    },
    {
      code: 'POLYGAMOUS',
      display: 'Polygamous',
    },
    {
      code: 'NEVER_MARRIED',
      display: 'Never Married',
    },
    {
      code: 'DOMESTIC_PARTNER',
      display: 'Domestic Partner',
    },
    {
      code: 'UNMARRIED',
      display: 'Unmarried',
    },
    {
      code: 'WIDOWED',
      display: 'Widowed',
    },
    {
      code: 'UNKNOWN',
      display: 'Unknown',
    },
  ],
  medicationOptions: [],
  clinicalOptions: [],
  encounterStatuses: [],
  religiousAffiliations: religions || [],
  genders: [
    {
      code: 'MALE',
      display: 'Male',
    },
    {
      code: 'FEMALE',
      display: 'Female',
    },
    {
      code: 'OTHER',
      display: 'Other',
    },
    {
      code: 'UNKNOWN',
      display: 'Unknown',
    },
  ],
  unitTypes: [],
  interpretationTypes: [],
  examUnitTypes: [],
  socialUnitTypes: [],
  vitalsUnitTypes: [
    {
      code: 'DEGREES_CELCIUS',
      display: '°C',
    },
    {
      code: 'WEIGHT_KG',
      display: 'kg',
    },
    {
      code: 'HEIGHT_CM',
      display: 'cm',
    },
    {
      code: 'BMI',
      display: 'kg/m2',
    },
    {
      code: 'PULSE',
      display: 'pulse (min)',
    },
    {
      code: 'BLOOD_PRESSURE',
      display: 'BP',
    },
    {
      code: 'RESPIRATORY_RATE',
      display: 'Respiratory rate',
    },
    {
      code: 'OXYGEN_SATURATION',
      display: 'SPO2',
    },
  ],
  languages: languages || [],
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
  currencies: [
    {
      code: 'GHS',
      display: 'GHS',
    },
    {
      code: 'USD',
      display: 'USD',
    },
  ],
  encounterPriorities: [],
  diagnosticLabProceedures: [],
  serviceGenericPeriodUnits: [
    {
      code: 'hours',
      display: 'hours',
    },
    {
      code: 'minutes',
      display: 'minutes',
    },
    {
      code: 'days',
      display: 'days',
    },
    {
      code: 'weeks',
      display: 'weeks',
    },
    {
      code: 'months',
      display: 'months',
    },
  ],
  serviceRequestCategoryTypes: [
    {
      code: 'Laboratory-procedure',
      display: 'Laboratory procedure',
    },
    {
      code: 'Imaging',
      display: 'Imaging',
    },
    {
      code: 'Counselling',
      display: 'Counselling',
    },
    {
      code: 'Education',
      display: 'Education',
    },
    {
      code: 'Surgical-procedure',
      display: 'Surgical procedure',
    },
  ],
  serviceRequestSectionTypes: diagServiceActionType || [],
  dosageRoutes: [],
  deviceTypes: [],
})
