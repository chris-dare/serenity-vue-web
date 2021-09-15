<template>
  <SeForm>
    <p class="text-primary my-4 font-semibold">
      Additional notes for the visit
    </p>
    <cv-text-area
      v-model="localValue.comment"
      placeholder="Write additional information for this appointment here"
      :rows="10"
    />
  </SeForm>
</template>

<script>
import modelMixin from '@/mixins/model'
export default {
  name: 'VisitNotesForm',

  mixins: [modelMixin],
}
</script>
