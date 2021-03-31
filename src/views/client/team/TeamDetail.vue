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
        <TeamDetailActionsDropdown
          @edit="$router.push({ name: 'TeamBiodata' })"
          @delete="$trigger('confirm:delete:open', { data:{}, label: 'Are you sure you want to delete this user?' })"
        />
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

    <ConfirmDeleteModal
      :loading="loading"
      @delete="remove"
    />
  </div>
</template>

<script>
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
import TeamDetailActionsDropdown from '@/components/team/TeamDetailActionsDropdown'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TeamDetail',

  components: { PatientSummaryCard, TeamDetailActionsDropdown },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.practitioners.currentUser,
    }),

    workspaces() {
      if (!this.currentUser || !this.currentUser.practitioner_role) {
        return ''
      }
      return this.currentUser.practitioner_role.permissions.workspaces.map(workspace => {
        return workspace.split('.')[0]
      }).join(
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
      return this.currentUser.practitioner_specialty.map(sp => sp.Display || sp).join(', ')
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

  async created() {
    await this.getUser(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getUser: 'practitioners/getUser',
      deleteUser: 'practitioners/deleteUser',
      setCurrentUser: 'practitioners/setCurrentUser',
    }),

    edit() {
      this.setCurrentUser()
    },

    async remove() {
      this.loading = true
      try {
        await this.deleteUser(this.$route.params.id).then(()=>{
          this.$toast.open({
            message: 'User successfully deleted',
          })
        })
        this.loading = false
        this.$trigger('confirm:delete:close')
        this.$router.push({ name: 'Team'})
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      }
    },
  },
}
</script>
