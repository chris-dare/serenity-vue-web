<template>
    <div class="px-6">
    <div v-if="true">
        <Steps :step="due" />
    </div>
    <div v-else class="flex flex-col justify-center py-12">
        <img src="@/assets/img/x ray 1.svg" class="mb-4" alt="">
        <p class="font-semibold text-center mb-2">Your queue is empty</p>
        <p class="text-secondary text-center">There are no patients waiting for you.</p>
    </div>
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
