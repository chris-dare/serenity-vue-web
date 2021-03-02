<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <img
            class="w-16 h-16 rounded-full mx-4"
            :src="$faker().image.image()"
            alt=""
          >
          <div>
            <p class="font-semibold">{{ $faker().name.findName() }}</p>
            <p class="text-secondary">
              Gynaecologist
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4 mr-4">
        <p class="text-green-500 font-semibold">Active</p>
        <SeButton>
          Actions
        </SeButton>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <PatientSummaryCard
        title="General Information"
        :fields="generalFields"
      />
      <PatientSummaryCard
        title="Workspaces, Role, and Location"
        :fields="workspaceFields"
        :cols="1"
      />
    </div>
  </div>
</template>

<script>
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
export default {
  name: 'TeamDetail',

  components: {PatientSummaryCard},

  computed: {
    generalFields() {
      return [
        {label: 'First Name', value: this.$faker().lorem.word() },
        { label: 'Last Name', value: this.$faker().lorem.word() },
        { label: 'Phone Number', value: this.$faker().lorem.word() },
        { label: 'Admin Email', value: this.$faker().lorem.word() },
        { label: 'Date of Birth', value: this.$faker().lorem.word() },
        { label: 'Title', value: this.$faker().lorem.word() },
        { label: 'Sex', value: this.$faker().lorem.word() },
        { label: 'Home Address', value: this.$faker().lorem.word() },
        { label: 'Postal Address', value: this.$faker().lorem.word() },
        { label: 'Signature', value: this.$faker().lorem.word() },
      ]
    },
    workspaceFields() {
      return [
        {label: 'Workspaces', value: this.$faker().lorem.word() },
        { label: 'Clinical Role', value: this.$faker().lorem.word() },
        { label: 'Specialty', value: this.$faker().lorem.word() },
        { label: 'Medical Practice code', value: this.$faker().lorem.word() },
      ]
    },
  },
}
</script>

<style>

</style>