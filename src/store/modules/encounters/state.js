export default () => ({
  encounters: [],
  currentEncounter: {},
  encounterState: 0,
  encounterCodes: [
    {label: 'ambulatory', value: 'AMB'},
    {label: 'emergency', value: 'EMER'},
    {label: 'field', value: 'FLD'},
    {label: 'home health', value: 'HH'},
    {label: 'inpatient encounter', value: 'IMP'},
    {label: 'inpatient acute', value: 'ACUTE'},
    {label: 'inpatient non-acute', value: 'NONAC'},
    {label: 'observation encounter', value: 'OBSENC'},
    {label: 'pre-admission', value: 'PRENC'},
    {label: 'short stay', value: 'SS'},
    {label: 'virtual', value: 'VR'},
  ],
})
