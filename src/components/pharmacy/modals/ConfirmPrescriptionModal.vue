<template>
  <div class="bg-white p-4 mb-8">
    <div
      v-if="mode === 'prescription'"
      class="mb-4"
    >
      <div class="font-bold">Prescribed medication by {{ doctor }}</div>
      <div class="text-xs text-gray-400 mb-2">{{ $date.formatDate(datePrescribed, 'dd MMM, yyyy') }}</div>
    </div>
    <div
      v-if="mode === 'prescription'"
      class="grid grid-cols-4 gap-8 mb-8"
    >
      <div
        v-for="drug in drugs"
        :key="drug.drug.id"
        class="p-2 rounded-xs cursor-pointer"
        :class="getPrescriptionClasses(drug)"
        @click="currentDrug = drug"
      >
        <template>{{ $utils.getFirstData(drug.drug.medication_detail) }}</template>
      </div>
    </div>
    <div v-if="currentDrug">
      <div>
        <template v-if="mode === 'prescription'">
          <div class="font-bold">Prescription details for {{ $utils.getFirstData(currentDrug.drug.medication_detail) }}</div>
          <div>
            <div class="grid grid-cols-4 gap-8 my-4">
              <div>
                <div class="font-sm text-gray-400 mb-2">Name of medicine</div>
                <div>{{ $utils.getFirstData(currentDrug.drug.medication_detail) }}</div>
              </div>
              <div>
                <div class="font-sm text-gray-400 mb-2">Frequency</div>
                <div class="capitalize">{{ $utils.getFirstData(currentDrug.drug.medication_request_dosage_instruction, 'frequency') }}</div>
              </div>
              <div>
                <div class="font-sm text-gray-400 mb-2">Dosage</div>
                <div>
                  {{ $utils.getFirstData(currentDrug.drug.medication_request_dosage_instruction, 'strength') }}
                </div>
              </div>
              <div>
                <div class="font-sm text-gray-400 mb-2">Instruction</div>
                <div>{{ $utils.getFirstData(currentDrug.drug.medication_request_notes) || '-' }}</div>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-8 my-4">
              <div>
                <div class="font-sm text-gray-400 mb-2">Prescribed on</div>
                <div>{{ $date.formatDate(currentDrug.drug.medication_detail) }}</div>
              </div>
              <div>
                <div class="font-sm text-gray-400 mb-2">Note</div>
                <div class="capitalize">{{ $utils.getFirstData(currentDrug.drug.medication_request_dosage_instruction, 'frequency') }}</div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8 my-4">
              <div>
                <div class="font-sm text-gray-400 mb-2">Course of therapy</div>
                <div class="capitalize">
                  {{ currentDrug.drug.course_of_therapy_type }}
                </div>
              </div>
              <div>
                <div class="font-sm text-gray-400 mb-2">Encounter</div>
                <div />
              </div>
            </div>
          </div>
        </template>
        <div class="mb-8 items-center">
          <div><p class="bx--label pr-4 font-bold mt-4">Available Drugs</p></div>
          <div class="flex-1">
            <Search
              v-model="search"
              placeholder="Search by drug name"
            />
          </div>
        </div>
        <div class="border-b border-serenity-subtle-border border-solid" />
        <div class="flex my-4">
          <div class="w-1/3 h-32 overflow-y-scroll">
            <div v-if="inventory.loading">
              <cv-skeleton-text />
              <cv-skeleton-text />
              <cv-skeleton-text />
              <cv-skeleton-text />
            </div>
            <div
              v-for="item in filteredPrescriptions"
              v-else 
              :key="item.id"
              :class="inventoryItemClass(item)"
              class="font-bold text-gray-600 p-2 cursor-pointer hover:text-serenity-primary hover:bg-green-100 hover:font-bold"
              @click="selectedInventoryItem = item"
            >
              {{ item.name }}
              <template v-if="item.dosage_form">- ({{ item.dosage_form }})</template>
              <template v-if="item.dosage_amount">- {{ parseInt(item.dosage_amount) }} {{ item.dosage_unit }}</template>
            </div>
            <!-- <DataTable
              :data="inventory.data"
              :loading="inventory.loading"
            >
              <template #default="{ row }">
                <cv-data-table-cell>
                  {{ row.name }}
                </cv-data-table-cell>
              </template>
            </DataTable> -->
          </div>
          <div class="px-4 w-2/3">
            <div class="font-bold pl-4">Drug Details</div>
            <DataTable
              ref="table"
              :data="inventoryDetails || []"
              :columns="columns"
              no-data-label="No drug selected"
            >
              <template #default="{ row }">
                <cv-data-table-cell>
                  {{ row.selling_price | formatMoney | toCedis }}
                </cv-data-table-cell>
                <cv-data-table-cell>
                  {{ row.initial_quantity }}
                </cv-data-table-cell>
                <cv-data-table-cell>
                  {{ row.batch_number }}
                </cv-data-table-cell>
                <cv-data-table-cell>
                  {{ row.expiry_date }}
                </cv-data-table-cell>
                <cv-data-table-cell>
                  {{ row.rack }}
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <!-- {{ row.rack }} -->
                </cv-data-table-cell>
              </template>
            </DataTable>
          </div>
        </div>
        <div class="mt-12">
          <div class="font-bold">Quantity</div>
          <div>
            <cv-number-input
              v-model="form.quantity"
              type="number"
              class="inline-block mr-4"
              placeholder=""
              :min="1"
              :max="maxQuantity"
            />
            <SeButton 
              class="inline-flex mt-6"
              size="sm"
              variant="secondary"
              :disabled="!isQuantityValid"
              @click="addDrug"
            >
              <Add />
              Add drug
            </SeButton>
          </div>
        </div>
        <div class="mt-12">
          <div class="font-bold mb-4">
            Selected drugs
          </div>
          <!-- <div
            v-if="currentDrug.selectedDrugs.length == 0"
            class="text-gray-400"
          >
            No drugs selected
          </div>
          <div v-else>
            <div
              v-for="item in currentDrug.selectedDrugs"
              :key="item.inventory.id"
            >
              <div class="text-gray-500 font-bold mb-2">
                {{ item.inventory.name }} - {{ item.total | formatMoney | toCedis }}
              </div>
            </div>
          </div> -->
          <DataTable
            ref="table"
            :data="currentDrug.selectedDrugs || []"
            :columns="['Drug', 'Dosage', 'Quantity', 'Total', '']"
            no-data-label="No drug selected"
          >
            <template #default="{ row }">
              <cv-data-table-cell>
                {{ row.inventory.name }}
              </cv-data-table-cell>
              <cv-data-table-cell>
                <template v-if="row.inventory.dosage_amount">{{ parseInt(row.inventory.dosage_amount) }} {{ row.inventory.dosage_unit }}</template>
              </cv-data-table-cell>
              <cv-data-table-cell>
                {{ row.quantity }}
              </cv-data-table-cell>
              <cv-data-table-cell>
                {{ row.total | formatMoney | toCedis }}
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div class="flex items-center space-x-2">
                  <Trash
                    class="w-4 h-4 cursor-pointer"
                    @click="removeDrug(row)"
                  />
                </div>
              </cv-data-table-cell>
            </template>
          </DataTable>
        </div>
      </div>
    </div>
    <div class="my-8 flex items-center justify-end">
      <SeButton
        class="mr-4"
        @click="checkout"
      >
        Prescription filled<ChevronRight class="w-4 h-4 text-white ml-4" />
      </SeButton>
    </div>
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark/32'
import { mapMutations, mapState } from 'vuex'
import PharmacyInventoryApi from '@/api/pharmacy-inventory'

export default {
  name: 'ConfirmPrescriptionModal',

  filters: {
    dosage (value) {
      if (!value) return ''
      let frequency_unit = ''
      if(value.frequency_unit == 'Hourly')frequency_unit = 'Hour'
      if(value.frequency_unit == 'Weekly')frequency_unit = 'Week'
      if(value.frequency_unit == 'Daily')frequency_unit = 'Day'
      if(value.frequency_unit == 'Monthly')frequency_unit = 'Month'
      return `${value.frequency} every ${frequency_unit}`
    },
    duration (value) {
      if (!value) return ''
      return `${value.period} ${value.period_unit}`
    },
  },

  props: {
    prescriptions: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: 'prescription',
    },
  },

  data() {
    return {
      form: {
        quantity: '1',
      },
      visible: false,
      saving: false,
      drugs: [],
      currentDrug: null,
      icons: {
        Checkmark,
      },
      search: '',
      inventory: {
        loading: false,
        data: [],
      },
      selectedInventoryItem: null,
      columns: [
        'Selling Price',
        'Quantity',
        'Batch No.',
        'Expiry date',
        'Shelf',
        'Rack',
      ],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      provider: (state) => state.auth.provider,
    }),
    filledPrescriptions() {
      return this.drugs.filter(el => el.filled)
    },
    inventoryDetails() {
      return this.selectedInventoryItem ? [this.selectedInventoryItem] : []
    },
    isQuantityValid(){
      if(!this.selectedInventoryItem)return false
      const quantity = parseInt(this.form.quantity)
      return  quantity <= this.maxQuantity && quantity > 0
    },
    maxQuantity() {
      if(!this.selectedInventoryItem)return 0
      return parseInt(this.selectedInventoryItem.net_release_quantity)
    },
    filteredPrescriptions() {
      return this.$utils.getFilteredData(this.inventory.data, this.search, ['name'])
    },
    doctor() {
      if(this.prescriptions.length == 0)return
      return this.prescriptions[0].practitioner_detail?.name
    },
    datePrescribed() {
      if(this.prescriptions.length == 0)return
      return this.prescriptions[0].created_at
    },
  },

  watch: {
    prescriptions: {
      immediate: true,
      handler(val) {
        this.drugs = val.map(el => {
          return {
            filled: false,
            drug: el,
            selectedDrugs: [],
          }
        })
        this.currentDrug = this.drugs[0]
        console.log(this.currentDrug)
      },
    },
    currentDrug: {
      immediate: true,
      handler(currentDrug) {
        if(this.mode === 'prescription' && !currentDrug)return
        const params = this.mode == 'prescription' ? {search: this.$utils.getFirstData(currentDrug.drug.medication_detail)} : null
        this.fetchInventory(params)
      },
    },
    patient: {
      immediate: true,
      handler(patient) {
        if(!(patient && patient.id))return null
        this.$store.dispatch('billing/getPatientAccounts', { id: patient.id }, { root:true })
      },
    },
  },

  mounted() {
    if(this.mode === 'walk-in'){
      this.currentDrug = {
        filled: false,
        drug: null,
        selectedDrugs: [],
      }
    }
  },

  validations() {
    const requiredIfFilled = (value) => {
      if(!value.filled)return true
      return !!value.inventory
    }
    return {
      drugs: {
        $each: {
          requiredIfFilled,
        },
      },
    }
  },
  
  methods: {
    ...mapMutations({
      setCheckoutPatient: 'checkout/Set existing patient',
      addCartItems: 'checkout/ADD_CART_ITEMS',
    }),
    // eslint-disable-next-line
    getPrescriptionClasses(drug){
      if(drug.filled)return 'bg-serenity-primary text-white'
      if(this.currentDrug.drug.id == drug.drug.id) return 'bg-gray-800 text-white'
      return 'bg-gray-200 text-gray-600'
    },
    inventoryItemClass(item){
      if(this.selectedInventoryItem && item.id == this.selectedInventoryItem.id){
        return 'bg-green-100 text-serenity-primary font-bold'
      }
      return ''
    },
    async dispenseDrugs() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      // const medicationRequests = this.drugs.filter(el => el.filled).map(el => {
      //   el.drug.medication = el.inventory
      //   return el.drug
      // })
      // this.$emit('success', medicationRequests)
      this.setCheckoutPatient(this.patient)
      this.$router.push({name: 'CheckoutPaymentOptions'})
    },
    async fetchInventory(params = {}, init = true) {
      if(init){
        this.inventory.loading = true
        this.inventory.data = []
      }
      const response = await PharmacyInventoryApi.list(params)
      this.inventory.loading = false
      this.inventory.data = response.data
      if(this.selectedInventoryItem){
        const selectedItemIndex = this.inventory.data.findIndex(el => el.id == this.selectedInventoryItem.id)
        if(selectedItemIndex < 0)this.selectedInventoryItem = null
      }
    },
    addDrug() {
      if(!this.selectedInventoryItem)return
      const quantity = parseInt(this.form.quantity)
      const total = parseFloat(this.selectedInventoryItem.selling_price) * parseInt(quantity)
      console.info(this.selectedInventoryItem.id)
      const existingItem = this.currentDrug.selectedDrugs.find(el => el.inventory.id == this.selectedInventoryItem.id)
      if(existingItem){
        existingItem.quantity += quantity
      }else{
        this.currentDrug.selectedDrugs.push({
          inventory: this.selectedInventoryItem,
          quantity,
          total,
        })
      }
      this.currentDrug.filled = true
      this.form.quantity = '1'
      this.selectedInventoryItem = null
      this.search = ''
    },
    removeDrug(drug) {
      this.currentDrug.selectedDrugs.splice(this.currentDrug.selectedDrugs.indexOf(drug), 1)
    },
    checkout() {
      let items = []
      if(this.mode === 'walk-in'){
        this.currentDrug.selectedDrugs.forEach(inventory => {
          items.push({
            description: '',
            name: inventory.inventory.name,
            quantity: inventory.quantity,
            selling_price: inventory.inventory.selling_price,
            id: inventory.inventory.id,
            inventory: inventory.inventory,
            medicationRequest: null,
          })
        })
      }else{
        this.drugs.forEach(el => {
          el.selectedDrugs.forEach(inventory => {
            items.push({
              description: '',
              name: inventory.inventory.name,
              quantity: inventory.quantity,
              selling_price: inventory.inventory.selling_price,
              id: inventory.inventory.id,
              inventory: inventory.inventory,
              medicationRequest: el.drug,
            })
          })
        })
      }
      if(items.length == 0){
        this.$toast.open({
          message: 'You have not added any prescriptions to be dispensed!',
          type: 'error',
        })
        return
      }
      this.addCartItems({items})
      this.$store.commit('checkout/SET_ACTION', 'medicationDispense')
      if(this.$route.name == 'Pharmacy:New'){
        this.setCheckoutPatient(null)
      }else{
        this.setCheckoutPatient(this.patient)
      }
      this.$router.push({name: 'Pharmacy:Dispense'})
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
