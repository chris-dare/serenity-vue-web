<template>
  <SeForm class="space-y-6">
    <AddPatientForm
      v-model="localValue"
      allow-existing
      :enable-title="false"
    />
    <MultiSelect
      v-model="localValue.managing_organization"
      :options="insuranceProviders"
      title="Insurance provider"
      placeholder="Select insurance provider"
      track-by="uuid"
      label="company_name"
      custom-field="main_branch_id"
      preselect
      :multiple="false"
      :error-message="$utils.validateRequiredField($v, 'managing_organization', 'localValue')"
      required
      :disabled="edit"
      @input="getPolicies"
    />
    <MultiSelect
      v-model="localValue.health_policy"
      :options="policies"
      title="Health policy"
      placeholder="Select health policy"
      track-by="uuid"
      label="name"
      custom-field="name"
      preselect
      :multiple="false"
      :error-message="$utils.validateRequiredField($v, 'health_policy', 'localValue')"
      required
      @input="getPolicies"
    />
    <FormInput
      v-model="localValue.card_no"
      required
      type="text"
      label="Insurance card number"
      placeholder="Enter insurance card number"
      :invalid-message="$utils.validateRequiredField($v, 'card_no', 'localValue')"
      @input="$v.$touch()"
    />
    <FormInput
      v-model="localValue.policy_holder"
      required
      type="text"
      label="Policy holder name"
      placeholder="Enter policy holder name"
      :invalid-message="$utils.validateRequiredField($v, 'policy_holder', 'localValue')"
      @input="$v.$touch()"
    />

    <p>Card Validity</p>

    <div class="grid grid-cols-2 gap-2">
      <DatePicker
        v-model="localValue.period_start"
        label="From"
        placeholder="Enter start date"
        class="se-input-gray"
      />
      <DatePicker
        v-model="localValue.period_end"
        :min-date="localValue.period_start"
        label="To"
        placeholder="Enter end date"
        class="se-input-gray"
        required
        :error-message="$utils.validateRequiredField($v, 'period_end', 'localValue')"
      />
    </div>

    <MultiSelect
      v-model="localValue.contribution_type"
      :options="contributionTypes"
      title="Contibution type"
      placeholder="Select contribution type"
      track-by="code"
      label="display"
      custom-field="code"
      preselect
      :multiple="false"
      required
      :error-message="$utils.validateRequiredField($v, 'contribution_type', 'localValue')"
    />

    <div
      v-if="localValue.contribution_type === 'COPAY'"
      class="flex"
    >
      <CurrencySelect
        v-model="localValue.contribution_currency"
        class="w-32"
      />
      <FormInput
        v-model="localValue.contribution_value"
        placeholder="Enter co payment amount"
        label="Co payment amount"
        class="flex-1"
        required
        :invalid-message="$utils.validateRequiredField($v, 'contribution_value', 'localValue')"
      />
    </div>

    <div v-else>
      <FormMixedInput
        v-model="localValue.contribution_value"
        placeholder="Enter co insurance amount"
        label="Co insurance value"
        suffix-text="%"
        required
        :invalid-message="$utils.validateRequiredField($v, 'contribution_value', 'localValue')"
      />
    </div>
  </SeForm>
</template>

<script>
import { mapState } from 'vuex'
import modelMixin from '@/mixins/model'
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
import InsuranceAPI from '@/api/insurance'
import AddPatientForm from '@/components/forms/AddPatientForm'

export default {
  name: 'AddInsuranceForm',

  components: {AddPatientForm},

  mixins: [modelMixin],

  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      policies: [],
      contributionTypes: [
        {display: 'Co payment (Flat fee)', code: 'COPAY'},
        {display: 'Co insurance (%)', code: 'COINSURANCE'},
      ],
    }
  },

  computed: {
    ...mapState({
      insuranceProviders: (state) => state.clients.clients,
      genders: (state) => state.resources.genders,
    }),
  },

  watch: {
    '$v.localValue.$invalid': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('invalid', newVal)
        }
      },
    },
  },

  created() {
    this.$v.$reset()
    if (this.edit) {
      this.getPolicies()
    }
  },

  validations() {
    let data = {
      localValue: {
        managing_organization: { required },
        card_no: { required },
        policy_holder: { required },
        period_end: { required },
        health_policy: { required },
        contribution_type: { required },
        contribution_value: { required },
        first_name: { required },
        last_name: { required },
        gender: { required },
        birth_date: { required },
        mobile: { required },
        email: { required },
      },
    }

    if (this.localValue.contribution_type === 'COPAY') {
      data.contribution_value = { required, minValue: minValue(0), maxValue: maxValue(100)}
    }
    return data
  },

  methods: {
    async getPolicies() {
      try {
        let { data } = await InsuranceAPI.insurancePolicies(this.$providerId, this.localValue.managing_organization)
        this.policies = data.data
      } catch (error) {
        // 
      }
    },
  },

}
</script>