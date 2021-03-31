<template>
  <div class="space-y-8">
    <!-- <cv-select
      v-model="type"
      label="Select the type of service"
      class="inherit-full-input"
      placeholder="Yes or No"
    >
      <cv-select-option value="single">Single</cv-select-option>
      <cv-select-option value="tiered">Tiered(multiple sub services)</cv-select-option>
    </cv-select> -->

    <cv-select
      v-model="code"
      label="Select service code"
      class="inherit-full-input"
      placeholder="Select code"
      :invalid-message="$v.code.$error && $v.code.$dirty ? 'Service code is required' : ''"
    >
      <cv-select-option
        v-for="(item, index) in codes"
        :key="index"
        :value="item.code"
      >
        {{ item.display_text }}
      </cv-select-option>
    </cv-select>
    <!-- single -->
    <p>Service Pricing Tiers</p>
    <div>
      <!-- <cv-number-input
        v-if="type === 'single'"
        v-model="form.price_tiers[0].cost"
        label="Enter service price"
        placeholder="eg 50"
      /> -->

      <div>
        <div
          v-for="(tier, index) in form.price_tiers"
          :key="index"
          class="grid grid-cols-11 gap-4 mb-8 items-end"
        >
          <cv-text-input
            v-model="tier.name"
            label="Service Tier"
            placeholder="Service tier name"
            class="col-span-4"
          />
          <cv-number-input
            v-model="tier.cost"
            label="Price"
            placeholder="Service tier price"
            class="col-span-4"
          />
          <CurrencySelect
            v-model="tier.currency"
            class="col-span-2"
          />
          <div class="flex items-end pb-3 justify-center">
            <Trash
              class="w-5 h-5 cursor-pointer"
              @click="removeFromTiers(index)"
            />
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
import { required, minLength, minValue } from 'vuelidate/lib/validators'
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
      code: null,
      form: {
        price_tiers: [
          {
            name: 'Free',
            cost: 0,
            currency: 'GHS',
          },
          {
            name: 'Standard',
            cost: 50,
            currency: 'GHS',
          },
          {
            name: 'Express',
            cost: 100,
            currency: 'GHS',
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.services.currentService,
      codes: (state) => state.resources.codes,
    }),
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({name: 'ServiceInformation'})
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
        healthcare_service_service_provision_display_text: code.display_text,
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: 'ServiceAvailability' })
    },

    addTier() {
      this.form.price_tiers.push({ name: '', cost: 0, currency: 'GHS'})
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
          name: {
            required,
          },
          currency: {
            required,
          },
          cost: {
            required,
            // minValue: minValue(1),
          },
        },
      },
    },
    code: { required },
  },
}
</script>
