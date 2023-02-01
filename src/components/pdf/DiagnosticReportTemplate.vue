<template>
  <div>
    <div
      id="diagnostic-report"
      class="bg-white relative min-h-screen pb-8 mb-6"
    >
      <div class="bg-gray-100 flex justify-between px-4 py-8">
        <div class="space-x-2 flex">
          <img
            class="w-20 h-20"
            src="@/assets/img/nyaho.png"
          >
          <div class="text-xs space-y-1">
            <p class="text-xs font-bold">Nyaho Medical Center</p>
            <p class="text-xs">+233-(0)30-708-6490 / (0)50-143-6662</p>
            <p class="text-xs">www.nyahomedical.com</p>
            <p class="text-xs">35 Kofi Annan St, Airport Residential Area, Accra - Ghana</p>
          </div>
        </div>
        <div>
          <p class="uppercase col-span-2 text-xxs tracking-wider">Patient Details</p>

          <div class="text-xs grid grid-cols-2 gap-y-1 gap-x-2">
            <p class="text-xs">Patient Name: </p>
            <p class="font-bold text-xs">{{ patient.first_name }} {{ patient.lastname }}</p>
            <p class="text-xs">MR Number:</p>
            <p class="font-bold text-xs">{{ patient.mr_number }}</p>
            <p class="text-xs">Age:</p>
            <p class="font-bold text-xs">{{ patient.age }}</p>
            <p class="text-xs">Gender:</p>
            <p class="font-bold text-xs">{{ patient.gender }}</p>
          </div>
        </div>
      </div>
      <div class="p-6 space-y-8">
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="(detail, index) in details"
            :key="index"
          >
            <p class="text-xxs uppercase tracking-wider text-gray-700">{{ detail.label }}</p>
            <p class="text-xs font-bold capitalize">{{ detail.value }}</p>
          </div>
        </div>

        <div class="space-y-6">
          <p class="font-bold">{{ report.display }}</p>

          
          <div class="min-h-20">
            <div
              v-if="report.diagnostic_report_results.length"
              class="grid grid-cols-4 gap-x-4 border-t border-b border-gray-100 border-solid py-2"
            >
              <p class="text-sm">Investigation</p>
              <p class="text-sm">Result</p>
              <p class="whitespace-nowrap text-sm">Reference</p>
              <p class="text-sm">Intepretation</p>
            </div>
            <div
              v-for="(list, index) in report.diagnostic_report_results"
              :key="index"
              class="grid grid-cols-4 gap-x-4 py-3 border-solid border-b border-gray-100 items-center"
            >
              <div class="text-left">
                <p class="text-gray-800 capitalize text-sm font-bold">{{ list.display | removeDash }}</p>
              </div>
              <div class="flex items-end justify-start text-sm">
                <p v-if="list.value">{{ list.value || '-' }}</p>
                <p
                  v-if="list.unit"
                  class="text-secondary ml-1 text-xs"
                >
                  {{ list.unit || '' }}
                </p>
              </div>
              <div class="text-left ">
                <p class="text-sm">{{ $utils.getFirstData(list.observation_reference_range, 'low') + '-' + $utils.getFirstData(list.observation_reference_range, 'high') }}</p>
              </div>
              <div
                v-if="list.observation_interpretation"
                class="flex items-center justify-end"
              >
                <div
                  class="w-2 h-2 rounded-full mr-2"
                  :class="list.observation_interpretation === 'Normal' ? 'bg-success' : list.observation_interpretation === 'Low' ? 'bg-blue' : 'bg-danger'"
                />
                <p class="text-sm">{{ list.observation_interpretation || '-' }}</p>
              </div>
            </div>
          </div>

        

          <div class="flex space-x-40">
            <p class="font-bold">Conclusion</p>
            <p class="text-xs">{{ report.conclusion }}</p>
          </div>
        </div>

        <div class="flex justify-end py-12">
          <div>
            <p class="text-gray-400 text-sm">Approved by</p>
            <p class="font-bold">{{ report.approved_by_name }}</p>
            <p class="text-xxs">Nyaho Medical Center</p>
          </div>
        </div>
      </div>

      <div class="absolute flex justify-between bottom-5 px-6 w-full">
        <div class="flex items-center space-x-1">
          <img src="@/assets/img/logo.svg">
          <p class="text-sm text-gray-500">Powered by Serenity Health</p>
        </div>

        <p class="text-sm text-gray-500">Visit us on serenity.health</p>
      </div>
    </div>
    <button @click="exportToPDF">Export to PDF</button>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
export default {
  name: 'DiagnosticReportTemplate',

  props: {
    report: {
      type: Object,
      default: () => {return {
        'id': 125638,
        'based_on': 169853,
        'code': 'LCMAL',
        'status': 'final',
        'issued_date': null,
        'patient': 161099,
        'patient_detail': {
          'first_name': 'Setor',
          'lastname': 'Tsegah',
          'gender': 'MALE',
          'birth_date': '1993-12-09',
          'mobile': '+233246699519',
          'age': 29,
        },
        'encounter': null,
        'visit': 'c6d4d394-d874-484b-a27e-226ab913c5b6',
        'category': 'Other',
        'service_request_category': 'Laboratory-procedure',
        'approved_by': 'f8ba721a-4d35-46f3-a7f9-0b9ae876cf43',
        'approved_by_name': 'Mr Stephen Awuah',
        'approved_date_time': '2023-02-01T15:05:56.192587Z',
        'rejected_by': null,
        'rejected_by_name': null,
        'rejected_date_time': null,
        'conclusion': 'MALARIA BF (THICK & THIN) - No malaria parasite seen',
        'effective_date_time': '2023-02-01T15:05:48.556972Z',
        'effective_period_start': '2023-02-01T14:24:04.439067Z',
        'effective_period_end': '2023-02-01T17:27:18.885635Z',
        'service_request_detail': {
          'id': 169853,
          'accession_number': 169853,
          'uuid': 'ecf4c665-1cde-4479-9e6c-efd39bf0372b',
          'category': 'Laboratory-procedure',
          'body_site': null,
          'code': 'LCMAL',
          'display': 'MALARIA PROFILE (BF + RDT)',
          'due_date': '2023-02-01T17:27:18.885635Z',
          'is_paid': true,
          'priority': 'routine',
          'replaces': null,
          'status': 'completed',
          'status_display': null,
          'group_identifier': null,
          'status_reason': null,
          'passport_number': null,
          'sample_received_date_time': null,
          'purpose': 'regular',
          'patient': 161099,
          'patient_detail': {
            'first_name': 'Setor',
            'lastname': 'Tsegah',
            'gender': 'MALE',
            'birth_date': '1993-12-09',
            'mobile': '+233246699519',
            'age': 29,
          },
          'location': 'a79ae42b-03b7-4f5e-ac1a-cd42729c0b04',
          'encounter': 'b50eaeb2-5c27-4c0d-bcbb-ea2b969ebe56',
          'visit': 'c6d4d394-d874-484b-a27e-226ab913c5b6',
          'occurence': '2023-02-01T14:24:04.439184Z',
          'authored_on': '2023-02-01T14:24:04.439197Z',
          'practitioner_detail': {
            'name': 'Dr George buah Bennett',
          },
          'requesting_patient': null,
          'requesting_practitioner_role': '31e0c46d-6d5f-4e62-8ea5-e2a6bb9500de',
          'requesting_related_contact': null,
          'patient_instruction': null,
          'healthcare_service': 'd9a86858-1cc0-4dc5-ac7f-c78ae17f3074',
          'price_tier': 668,
          'note': null,
          'is_available_at_provider': true,
          'encounter_diagnoses': [
            'Acute upper respiratory infection, unspecified',
            'Encounter for screening for COVID-19',
          ],
        },
        'diagnostic_report_performer': [
          {
            'id': 121738,
            'practitioner_detail': {
              'name': 'Mr Stephen Awuah',
            },
            'uuid': 'd5d5521e-9813-4cf3-8966-f593deac8e42',
            'created_at': '2023-02-01T15:05:48.569280Z',
            'modified_at': '2023-02-01T15:05:48.569290Z',
            'organization': null,
            'practitioner_role': '0aca36d5-c919-48a5-adc8-3689a1b44e90',
          },
        ],
        'diagnostic_report_results_interpreter': [],
        'diagnostic_report_specimen': [],
        'diagnostic_report_results': [
          {
            'id': 1797101,
            'status': 'final',
            'code': 'RDT Malaria',
            'display': 'RDT Malaria',
            'patient': 161099,
            'encounter': null,
            'visit': 'c6d4d394-d874-484b-a27e-226ab913c5b6',
            'issued': '2023-02-01T15:05:48.566674Z',
            'value': 'NEGATIVE',
            'data_absent_reason': null,
            'body_site': null,
            'method': null,
            'specimen': null,
            'device': null,
            'unit': '',
            'rank': null,
            'reference_range_high': null,
            'effective_date_time': '2023-02-01T15:05:48.566693Z',
            'observation_category': [],
            'observation_component': [],
            'observation_interpretation': null,
            'observation_note': [],
            'observation_performer': [],
            'observation_partof': [],
            'observation_based_on': [],
            'observation_reference_range': [
              {
                'reference_range': {
                  'high': null,
                  'low': null,
                  'unit': '',
                  'age_range_low': null,
                  'age_range_high': null,
                  'applies_to': [],
                },
              },
            ],
          },
        ],
        'diagnostic_report_conclusion_code': [],
        'diagnostic_report_imaging_study': [],
        'diagnostic_report_cancelled_reasons': [],
        'diagnostic_report_media': [],
        'specimen_types': 'blood',
        'display': 'MALARIA PROFILE (BF + RDT)',
      }
      },
    },
  },

  computed: {
    patient() {
      return this.report?.patient_detail || {}
    },

    details() {
      return [
        {label: 'Performed by', value: this.report?.diagnostic_report_performer[0]?.practitioner_detail?.name},
        // {label: 'Specimen collected at', value: this.$date.formatDate(this.report?.service_request_detail?.issued_date)},
        {label: 'Date Requested', value: this.$date.formatDate(this.report?.service_request_detail?.authored_on)},
        {label: 'Date completed', value: this.$date.formatDate(this.report?.approved_date_time)},
        {label: 'Requested by', value: this.report?.service_request_detail?.practitioner_detail?.name},
        {label: 'Collected specimen', value: this.report?.specimen_types},
        {label: 'Report generated on', value: this.$date.formatDate(Date.now())},
      ]
    },
  },

  methods: {
    exportToPDF() {
      html2pdf(document.getElementById('diagnostic-report'), {
        margin: [5,1,20,1], filename: 'diagnostic-report.pdf',
      })
    },
  },
}
</script>
