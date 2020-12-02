<template>
  <div class="px-6">
      <Steps :step="due" />
  </div>
</template>

<script>
import { createPatients } from '@/services/helpers'
import Steps from './Steps'
export default {
    name: 'Queue',

    components: { Steps },

    computed: {
        due() {
            return { title: 'Due', patients: createPatients(3) }
        },
        met() {
            return createPatients(2)
        },
    },
}
</script>
