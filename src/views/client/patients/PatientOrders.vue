<template>
  <div>
    <Search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center justify-between">
      <div class="space-x-2 flex items-center">
        <SeButton>
          All ({{ 23 }})
        </SeButton>
        <SeButton
          variant="white"
          @click="visible = !visible"
        >
          Paid ({{ 1 }})
        </SeButton>
        <SeButton
          variant="white"
        >
          Unpaid ({{ 1 }})
        </SeButton>
        <SeButton
          variant="white"
        >
          Cancelled ({{ 1 }})
        </SeButton>
      </div>
    </div>
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Bills/Orders</p>
        <div
          class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center cursor-pointer"
        >
          <Add32 class="w-4 h-4 text-serenity-primary" />
        </div>
      </div>

      <DataTable
        ref="table"
        :columns="columns"
        :pagination="{
          numberOfItems: 10,
        }"
        :data="[]"
        class="transparent-table"
      >
        <cv-data-table-cell>
          <p class="">{{ $date.formatDate($faker().date.recent(), 'MMM dd, yyyy') }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p class="">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p class="">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p class="">{{ $faker().finance.amount() | formatMoney | toCedis }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p class="">{{ $faker().lorem.word() }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center">
            <div class="bg-success text-white text-xs py-1 px-2 rounded-full">{{ $faker().lorem.word() }}</div>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer "
            @click="showOrder(row)"
          >
            View
            <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
          </div>
        </cv-data-table-cell>
      </DataTable>
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
