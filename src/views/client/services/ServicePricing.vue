<template>
  <div class="space-y-8">
    <MultiSelect
      v-model="code"
      title="Select service code"
      placeholder="Select code"
      :invalid-message="$v.code.$error && $v.code.$dirty ? 'Service code is required' : ''"
      :options="codes"
      label="display_text"
      track-by="code"
      custom-field="code"
      :multiple="false"
      required
    />
    <p>Service Pricing Tiers</p>
    <div>
      <div>
        <div
          v-for="(tier, index) in form.price_tiers"
          :key="index"
        >
          <p>{{ index +1 }}.</p>
          <div class="grid grid-cols-11 gap-4 mb-8 items-center">
            <div class="grid grid-cols-5 gap-4 col-span-10 items-end">
              <FormInput
                v-model="tier.display"
                required
                label="Service Tier"
                placeholder="Service tier name"
                type="text"
                class="col-span-2"
              />
              <FormInput
                v-model="tier.charge"
                label="Price"
                placeholder="Service tier price"
                class="col-span-2"
                type="number"
                required
              />
              <CurrencySelect
                v-model="tier.currency"
                class="col-span-1"
                required
              />
              <FormInput
                v-model="tier.description"
                label="Description"
                placeholder=""
                :rows="2"
                class="col-span-3"
              />
              <PrioritiesSelect
                v-model="tier.priority"
                class="col-span-2"
              />
              <FormInput
                v-if="isDiagnostic"
                v-model="tier.turnaround_time_value"
                label="Turnaround time"
                placeholder="Price tier turnaround time"
                type="number"
                class="col-span-2"
                :invalid-message="$utils.validateRequiredField($v, 'turnaround_time_value')"
                :required="isDiagnostic"
              />
              <MultiSelect
                v-if="isDiagnostic"
                v-model="tier.turnaround_time_unit"
                :options="genericPeriodUnitTypes"
                :multiple="false"
                placeholder="Price tier turnaround time unit"
                label="display"
                track-by="code"
                custom-field="code"
                title="Turnaround time unit"
                class="col-span-3"
                :error-message="$utils.validateRequiredField($v, 'turnaround_time_unit')"
                :required="isDiagnostic"
              />
            </div>
            <div class="flex items-center pb-3 justify-center">
              <Trash
                class="w-5 h-5 cursor-pointer"
                @click="removeFromTiers(index)"
              />
            </div>
          </div>
        </div>

        <div
          class="flex items-center space-x-2 text-serenity-primary my-4 cursor-pointer text-sm"
          @click="addTier"
        >
          <AddAlt class="w-5 h-5" />
          <p class="text-serenity-primary">Add new service tier</p>
        </div>
      </div>

      <p
        v-if="$utils.validateRequiredField($v, 'price_tiers')"
        class="text-red-600 text-xs my-3"
      >
        Every price is required
      </p>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
          @click="cancel"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: 'ServiceInformation' }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          @click="save"
        >
          Next
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'ServicePricing',

  mixins: [MultiStep],

  data() {
    return {
      type: 'single',
      tiers: [],
      code: 'cost',
      form: {
        price_tiers: [
          {
            display: 'Free',
            charge: 0,
            currency: 'GHS',
            description: 'Express service for service name',
            priority: 'routine',
          },
          {
            display: 'Standard',
            charge: 50,
            currency: 'GHS',
            description: 'Express service for service name',
            priority: 'routine',
          },
          {
            display: 'Express',
            charge: 100,
            currency: 'GHS',
            description: 'Express service for service name',
            priority: 'urgent',
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.services.currentService,
      codes: (state) => state.resources.codes,
      genericPeriodUnitTypes: (state) => state.resources.serviceGenericPeriodUnits,
    }),

    isDiagnostic() {
      return this.form.healthcare_service_categories[0]?.code === 'Diagnostic'
    },

    previous() {
      return this.$route.meta.previous
    },
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({ name: this.previous })
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'services/addToCurrentService',
      refreshCurrentService: 'services/refreshCurrentService',
    }),

    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      let code = this.codes.find(c => c.code === this.code)

      this.form = {
        ...this.form,
        healthcare_service_service_provision_code: code.code,
        // healthcare_service_service_provision_display_text: code.display_text,
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: 'ServiceAvailability' })
    },

    addTier() {
      this.form.price_tiers.push({ display: '', charge: 0, currency: 'GHS'})
    },

    removeFromTiers(priceIndex) {
      this.form.price_tiers.splice(priceIndex, 1)
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },
  },

  validations: {
    form: {
      price_tiers: {
        required,
        minLength: minLength(1),
        $each: {
          display: {
            required,
          },
          currency: {
            required,
          },
          charge: {
            required,
            // minValue: minValue(1),
          },
          turnaround_time_value: {
            required: requiredIf(function () {
              return this.isDiagnostic
            }),
          },
          turnaround_time_unit: {
            required: requiredIf(function () {
              return this.isDiagnostic
            }),
          },
        },
      },
    },
    code: { required },
  },
}
</script>
