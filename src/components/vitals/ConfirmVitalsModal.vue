<template functional>
  <div class="bg-white p-6 my-6">
    <div>
      <p class="mb-6 text-lg text-serenity-primary">Confirm Vitals Submission</p>
      <VitalsDetail
        :small="false"
        :form="form"
      />
      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="listeners['back']"
        >
          Go back
        </SeButton>
        <SeButton
          :loading="props.loading"
          @click="listeners['save']"
        >
          Submit
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import VitalsDetail from '@/components/vitals/VitalsDetail'
export default {
  name: 'ConfirmVitalsModal',

  components: { VitalsDetail },

  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
