<template>
  <div class="space-y-4">
    <p class="text-lg font-semibold">Prescriptions</p>
    <div>
      <div
        v-for="row in $v.drugs.$each.$iter"
        :key="row.$model.drug"
        class="border-b border-gray-200 pb-6 mb-6 border-solid"
      >
        <div class="flex text-gray-500 text-sm mb-2">
          <div class="w-1/4">
            <div>Name of medicine</div>
          </div>
          <div class="w-1/4">
            <div>Duration</div>
          </div>
          <div class="w-1/4">
            <div>Dosage</div>
          </div>
          <div class="w-1/4">
            <div>Instruction</div>
          </div>
        </div>
        <div class="flex mb-2">
          <div class="w-1/4">
            <div>{{ row.$model.drug.medication_detail[0].display }}</div>
          </div>
          <div class="w-1/4">
            <div>{{ row.$model.drug.duration }}</div>
          </div>
          <div class="w-1/4">
            <div>{{ row.$model.drug.dosage }}</div>
          </div>
          <div class="w-1/4">
            <div>{{ row.$model.drug.instruction }}</div>
          </div>
        </div>
        <div v-if="row.$model.filled">
          <AutoCompletePharmacyInventory
            v-model="row.$model.inventory"
            :medication-request="row.$model.drug"
            class="col-span-3"
            :error-message="row.inventory.$error ? 'Please select an item from inventory' : null"
          />
        </div>
        <div class="flex items-center justify-end mt-4">
          <SeButton
            :variant="row.$model.filled == true ? 'secondary' : 'secondary-outline'"
            class="mr-4"
            @click="row.$model.filled = true"
          >
            Prescription filled<Checkmark class="w-4 h-4 text-white ml-4" />
          </SeButton>
          <SeButton
            :variant="row.$model.filled == true ? 'danger-outline' : 'danger'"
            @click="row.$model.filled = false"
          >
            Drug is unavailable <span class="ml-4">&#8212;</span>
          </SeButton>
        </div>
      </div>
    </div>
    <div />
    <div class="flex items-center justify-between mt-4 mb-6">
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$emit('cancel')"
      >
        Cancel
      </cv-button>
      <cv-button-skeleton
        v-if="saving"
      />
      <cv-button
        v-else
        kind="primary"
        class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6"
        @click="dispenseDrugs"
      >
        Confirm
      </cv-button>
    </div>
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ConfirmPrescriptionModal',

  props: {
    prescriptions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      form: {},
      visible: false,
      saving: false,
      drugs: [],
      icons: {
        Checkmark,
      },
    }
  },

  watch: {
    prescriptions: {
      immediate: true,
      handler(val) {
        this.drugs = val.map(el => {
          return {
            filled: true,
            drug: el,
          }
        })
      },
    },
  },

  validations: {
    drugs: {
      $each: {
        inventory: { required },
      },
    },
  },
  
  methods: {
    async dispenseDrugs() {
      this.$v.$touch()
      console.info(this.$v)
      if (this.$v.$invalid) {
        return
      }
      const medicationRequests = this.drugs.filter(el => el.filled).map(el => {
        el.drug.medication = el.inventory
        return el.drug
      })
      this.$emit('success', medicationRequests)
      // this.saving = true
      // try {
      //   const medicationRequests = this.drugs.filter(el => el.filled).map(el => {
      //     el.drug.medication = el.inventory
      //     console.info(el.drug)
      //     return el.drug
      //   })
      //   await this.$store.dispatch('patients/dispenseDrugs', {
      //     medicationRequests: medicationRequests,
      //   })
      //   this.$toast.open({
      //     message: 'Medication successfully dispensed',
      //   })
      //   this.visible = false
        
      //   /* eslint-disable-next-line */
      // } catch (error) {
        
      // }finally{
      //   this.saving = false
      // }
    },
  },

  events: {
    'pharmacy:confirm_prescription:open': function(){
      this.visible = true
    },
    'pharmacy:confirm_prescription:close': function(){
      this.visible = false
    },
  },
}
</script>
