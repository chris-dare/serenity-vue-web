<template>
  <div>
    <cv-search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center space-x-2">
      <SeButton
        variant="primary"
        size="field"
      >
        All ({{ 4 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        Lab Reports ({{ 1 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        X-ray ({{ 1 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        CT Scans ({{ 1 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        MRI Scans ({{ 1 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        Surgery Reports ({{ 0 }})
      </SeButton>
      <SeButton
        size="field"
        variant="white"
      >
        Discharge Reports ({{ 0 }})
      </SeButton>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <ReportCard
        v-for="(item, index) in 3"
        :key="index"
        @click="visible = !visible"
      />
      <XrayCard />
    </div>
    <LabTestModal :visible.sync="visible" />
  </div>
</template>

<script>
import ReportCard from '@/components/patients/reports/ReportCard'
import XrayCard from '@/components/patients/reports/XrayCard'
import LabTestModal from '@/components/patients/reports/LabTestModal'
export default {
  name: 'PatientReports',

  components: { ReportCard, XrayCard, LabTestModal },

  data() {
    return {
      search: '',
      visible: false,
    }
  },
}
</script>
