<template>
  <div class="flex items-center">
    <AddNewDropdown />

    <SeButton
      v-if="hasPatientBeenAdmitted"
      variant="warning"
      :loading="loading"
      @click="$trigger('profile:discharge:open')"
    >
      Discharge Patient
    </SeButton>
    <SeButton
      v-else
      variant="warning"
      :loading="loading"
      @click="$trigger('profile:admit:open')"
    >
      Admit Patient
    </SeButton>
  </div>
</template>

<script>
import AddNewDropdown from '@/components/patients/AddNewDropdown'

export default {
  name: 'IPDActions',

  components: { AddNewDropdown },

  data() {
    return {
      hasPatientBeenAdmitted: false,
      loading: false,
    }
  },
}
</script>
