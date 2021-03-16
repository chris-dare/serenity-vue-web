<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <img
            v-if="currentUser.photo"
            :src="currentUser.photo"
            alt=""
            class="w-16 h-16 rounded-full mx-4"
          >
          <Avatar
            v-else
            class="w-16 h-16 mx-4"
            :name="`${currentUser.first_name}  ${currentUser.last_name}}`"
          />
          <div>
            <p class="font-semibold">
              {{ currentUser.title }} {{ currentUser.first_name }}
              {{ currentUser.last_name }}
            </p>
            <p class="text-secondary capitalize">{{ specialtyName }}</p>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4 mr-4">
        <p class="text-green-500 font-semibold">Active</p>
        <SeButton> Actions </SeButton>
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
import { mapState } from 'vuex'
export default {
  name: 'TeamDetail',

  components: { PatientSummaryCard },

  computed: {
    ...mapState({
      currentUser: (state) => state.practitioners.currentUser,
    }),
    workspaces() {
      if (!this.currentUser || !this.currentUser.practitioner_role) {
        return ''
      }
      return this.currentUser.practitioner_role.permissions.workspaces.join(
        ', ',
      )
    },
    roleName() {
      if (!this.currentUser || !this.currentUser.practitioner_role) {
        return ''
      }
      return this.currentUser.practitioner_role.name
    },
    specialtyName() {
      if (!this.currentUser || !this.currentUser.practitioner_specialty) {
        return ''
      }
      return this.currentUser.practitioner_specialty[0]
    },
    generalFields() {
      return [
        { label: 'First Name', value: this.currentUser.first_name },
        { label: 'Last Name', value: this.currentUser.last_name },
        { label: 'Phone Number', value: this.currentUser.phone_number },
        { label: 'Email', value: this.currentUser.email },
        { label: 'Date of Birth', value: this.currentUser.date_of_birth },
        { label: 'Title', value: this.currentUser.title },
        { label: 'Sex', value: this.currentUser.gender },
        { label: 'Home Address', value: this.currentUser.address },
        { label: 'Postal Address', value: this.currentUser.address },
        { label: 'Signature', value: this.currentUser.signature },
      ]
    },
    workspaceFields() {
      // let specialty
      // if (this.currentUser) {
      //   if (this.currentUser.practitioner_specialty) {
      //     specialty = this.currentUser.practitioner_specialty[0]
      //   }
      // }
      return [
        { label: 'Workspaces', value: this.workspaces },
        { label: 'Clinical Role', value: this.roleName },
        { label: 'Specialty', value: this.specialtyName },
        { label: 'Medical Practice code', value: null },
      ]
    },
  },
}
</script>
