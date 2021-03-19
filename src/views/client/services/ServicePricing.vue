<template>
  <div class="space-y-8">
    <cv-select
      v-model="type"
      label="Select the type of service"
      class="inherit-full-input"
      placeholder="Yes or No"
    >
      <cv-select-option value="single">Single</cv-select-option>
      <cv-select-option value="tiered">Tiered(multiple sub services)</cv-select-option>
    </cv-select>
    <!-- single -->
    <div>
      <cv-number-input
        v-if="type === 'single'"
        v-model="form.price_tiers[0].cost"
        label="Enter service price"
        placeholder="eg 50"
      />

      <div
        v-else
      >
        <div
          v-for="(tier, index) in form.price_tiers"
          :key="index"
          class="grid grid-cols-11 gap-4 mb-8"
        >
          <cv-text-input
            v-model="tier.name"
            label="Service Tier"
            placeholder="Service tier name"
            class="col-span-5"
          />
          <cv-number-input
            v-model="tier.cost"
            label="Price"
            placeholder="Service tier price"
            class="col-span-5"
          />
          <div class="flex items-end pb-3 justify-center">
            <Trash
              class="w-5 h-5"
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
        Every price should be greater than 0
      </p>
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <cv-button
        class="border-serenity-primary text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary px-6"
        kind="tertiary"
      >
        Cancel
      </cv-button>
      <div class="flex items-center">
        <cv-button
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          @click="save"
        >
          Next
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required, minLength, minValue } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ServicePricing',

  data() {
    return {
      type: 'single',
      tiers: [],
      icon: ChevronRight,
      form: {
        price_tiers: [
          {
            name: 'standard',
            cost: 0,
          },
        ],
      },
    }
  },

  computed: {
    ...mapState({
      currentService: (state) => state.services.currentService,
    }),
  },

  created() {
    if (Object.keys(this.currentService).length === 0) {
      this.$router.push({name: 'ServiceInformation'})
    }
    this.form = { ...this.currentService, ...this.form }
  },

  methods: {
    ...mapActions({
      addToCurrentService: 'services/addToCurrentService',
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

      this.addToCurrentService(this.form)
      this.$router.push({ name: 'ServiceAvailability' })
    },

    addTier() {
      this.form.price_tiers.push({ name: '', cost: 0})
    },

    removeFromTiers(priceIndex) {
      this.form.price_tiers.splice(priceIndex, 1)
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
          cost: {
            required,
            minValue: minValue(1),
          },
        },
      },
    },
  },
}
</script>
