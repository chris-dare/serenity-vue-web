<template>
  <div class="bg-white space-y-2 p-4">
    <p class="text-secondary font-semibold">Dependants</p>
    <div class="flex items-center space-x-4">
      <div
        v-for="(dependent, index) in dependents"
        :key="index"
      >
        <InfoImageBlock
          size="large"
          :label="`${dependent.patient_detail.first_name} ${dependent.patient_detail.lastname}`"
        >
          <div>
            <p class="text-secondary text-xs">{{ dependent.patient_detail.gender }} {{ $date.getAge(dependent.patient_detail.birth_date) }} </p>
            <p class="text-secondary text-xs">{{ dependent.relationship | capitalize }}</p>
          </div>
        </InfoImageBlock>
      </div>

      <div
        class="flex items-center space-x-2 cursor-pointer"
        @click="$trigger('dependent:add:open')"
      >
        <div class="h-16 w-16 bg-serenity-primary rounded-full flex items-center justify-center">
          <AddAlt class="w-10 h-10 text-white" />
        </div>
        
        <p class="font-semibold text-sm">Add new dependant</p>
      </div>
    </div>

    <AddDependent />
  </div>
</template>

<script>
import AddDependent from '@/components/dependents/AddDependent'
import { mapState } from 'vuex'

export default {
  name: 'Dependants',

  components: {AddDependent},

  computed: {
    ...mapState({
      dependents: (state) => state.dependents.dependents,
    }),
  },

}
</script>

<style>

</style>