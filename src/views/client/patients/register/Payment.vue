<template>
  <cv-form
    autocomplete="off"
    @submit.prevent=""
  >
    <div class="grid grid-cols-2 gap-8">
      <SingleSelect
        v-model="form.payment_options[0].payment_type"
        :options="options"
        title="Primary method of payment"
        placeholder="Payment Type"
        preselect
      />
      <SingleSelect
        v-if="isMoMo"
        v-model="form.payment_options[0].payment_details.payment_provider"
        :options="networks"
        title="Payment provider"
        placeholder="Payment Type"
      />
      <MsisdnPhoneInput
        v-if="isMoMo"
        v-model="form.payment_options[0].payment_details.msisdn"
        label="Phone number"
      />
      <FormCountrySelect
        v-if="isMoMo"
        v-model="form.payment_options[0].payment_details.country"
        title="Country"
        placeholder="Country"
      />
      <!-- <cv-text-input
        v-model="form.name_of_account"
        label="Name of Account"
        placeholder="Name of MoMo Account"
        type="text"
        class="inherit-full-input"
      />
      <cv-text-input
        v-model="form.momo_number"
        label="MoMo number"
        placeholder="Eg. 054 — — — — —"
        class="inherit-full-input"
      />
      <cv-select
        v-model="form.secondary_method"
        label="Secondary method of payment"
        class="inherit-full-input"
      >
        <cv-select-option
          disabled
          selected
          hidden
        >
          Select an option
        </cv-select-option>
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
        >
          {{ network }}
        </cv-select-option>
      </cv-select> -->
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: previous }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          :loading="loading"
          @click="submit"
        >
          Finish
        </SeButton>
      </div>
    </div>
    <PatientSuccessModal :visible.sync="visible" />
  </cv-form>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import PatientSuccessModal from '@/components/patients/modals/PatientSuccessModal'
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'Payment',

  components: {PatientSuccessModal},

  mixins: [MultiStep],

  data() {
    return {
      form: {
        payment_options: [{
          payment_details: {},
        }],
      },
      icon: Checkmark,
      networks: ['MTN', 'Vodafone', 'AirtelTigo'],
      options: ['cash' ,'momo' ,'insurance' ,'corporate' ,'card'],
      religions: ['christianity', 'islam'],
      visible: false,
      parent: 'Patients',
      previous: 'SocialInfo',
      loading: false,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.patients.currentPatient,
    }),

    isMoMo() {
      return this.form.payment_options[0].payment_type === 'momo'
    },
  },

  created() {
    if(!this.form.payment_options[0].payment_details.msisdn){ 
      this.form.payment_options[0].payment_details.msisdn = this.form.mobile
    }
  },
  
  methods: {
    ...mapActions({
      addToStoreData: 'patients/addToCurrentPatient',
      refresh: 'patients/refreshCurrentPatient',
      createPatient: 'patients/createPatient',
      updatePatient: 'patients/updatePatient',
    }),

    submit() {
      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true
      try {
        await this.createPatient(this.form)
        this.$toast.open({
          message: 'Patient successfully added',
        })
        this.visible = true
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      }
    },

    async update() {
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.updatePatient(this.form)
        this.$toast.open({
          message: 'Patient successfully updated',
        })
        this.$router.push({name: 'PatientSummary', params: { id:this.form.id }})
      } catch (error) {
        console.info(error)
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
      }

      this.loading = false
    },
  },
}
</script>
