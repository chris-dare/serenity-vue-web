<template>
  <cv-form
    autocomplete="off"
    class="space-y-8"
    @submit.prevent
  >
    <p class="text-primary mb-4 text-left">Team Member Type</p>

    <MultiSelect
      v-model="form.practitioner_role"
      :options="roles"
      label="name"
      track-by="id"
      title="Clinical Role"
      placeholder="Select a clinical role"
      :error-message="$utils.validateRequiredField($v, 'practitioner_role')"
      required
    />

    <MultiSelect
      v-model="form.practitioner_specialty"
      multiple
      :options="specialties"
      label="display"
      track-by="code"
      title="Specialty"
      placeholder="Select one or more specialties"
      :error-message="$utils.validateRequiredField($v, 'practitioner_specialty')"
      required
    />

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          :to="{ name: 'Team' }"
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          variant="secondary"
          :to="{ name: 'TeamContactInformation' }"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :loading="loading"
          :icon="icon"
          variant="default"
          @click="submit"
        >
          Submit
        </SeButton>
      </div>
    </div>
  </cv-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required, minLength } from 'vuelidate/lib/validators'
import isEmpty from 'lodash/isEmpty'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'TeamIdentification',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        practitioner_specialty: [],
        practitioner_role: '',
        team_member_type: 'clinical_staff',
      },
      titles: [{label:'Clinical Staff', value: 'clinical_staff'}, {label:'Non-Clinical Staff', value: 'non_clinical_staff'}],
      loading: false,
      icon: ChevronRight,
      practitionerRole: '',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.practitioners.currentUser,
      roles: (state) => state.roles.roles,
      specialties: (state) => state.resources.specialties,
      workspaces: (state) => state.workspaces.workspaces,
    }),
  },

  validations: {
    form: {
      practitioner_role: { required },
      practitioner_specialty: { required, minLength: minLength(1) },
    },
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({name: 'TeamBiodata'})
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'practitioners/addToCurrentUser',
      createUser: 'practitioners/createUser',
      updateUser: 'practitioners/updateUser',
      reset: 'practitioners/reset',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.createUser(this.form)
        this.$toast.open({
          message: 'Team member successfully added',
        })
        this.reset()
        this.$router.push({name: 'Team'})
      } catch (error) {
        console.log('error', error)
      }

      this.loading = false
    },

    async update() {
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.updateUser(this.form)
        this.$toast.open({
          message: 'Team member successfully updated',
        })
        this.reset()
        this.$router.push({name: 'TeamDetail', params: { id: this.form.id }})
      } catch (error) {
        console.log('error', error)
      }

      this.loading = false
    },
  },
}
</script>
