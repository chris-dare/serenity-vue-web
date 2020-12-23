<template>
  <div>
    <cv-search
      placeholder="Search for medication or date or condition"
      v-model="search"
    >
    </cv-search>
    <div class="my-4 flex items-center justify-between">
      <div>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All ({{ 23 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          @click="visible = !visible"
        >
          Paid ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
        >
          Unpaid ({{ 1 }})
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
        >
          Cancelled ({{ 1 }})
        </cv-button>
      </div>
    </div>
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm text-gray-500">Bills/Orders</p>
        <div
          class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center cursor-pointer"
        >
          <Add32 class="w-4 h-4 text-serenity-primary" />
        </div>
      </div>

      <cv-data-table
        :columns="columns"
        :pagination="{
          numberOfItems: 10,
        }"
        v-model="rowSelects"
        :data="[]"
        ref="table"
        class="transparent-table"
        size="tall"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <p class="text-sm">{{ $date.formatDate($faker().date.recent(), 'MMM dd, yyyy') }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="text-sm">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p class="text-sm">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="text-sm">{{ $faker().lorem.word() }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div class="flex items-center">
                <div class="bg-success text-white text-xs py-1 px-2 rounded-full">{{ $faker().lorem.word() }}</div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div @click="showOrder(row)" class="flex items-center cursor-pointer text-sm" >
                View
                <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img src="@/assets/img/view 1.svg" alt="">
                </div>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <OrderDetailsModal :visible.sync="visible" />
  </div>
</template>

<script>
import OrderDetailsModal from '@/components/patients/modals/OrderDetailsModal'
import Add32 from '@carbon/icons-vue/es/add/32'
export default {
  name: 'PatientOrders',

  components: { OrderDetailsModal, Add32 },

  data() {
    return {
      search: '',
      rowSelects: null,
      columns: [
        'Date',
        'Total Amount',
        'Amount Paid',
        'Balance',
        'Method',
        'Status',
        'Action',
      ],
      visible: false,
      order: {},
    }
  },

  methods: {
      showOrder(data) {
          this.order = data
          this.visible = true
      },
  },
}
</script>
