<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Bills ({{ 5 }})</p>
      </div>

      <cv-search
        v-model="search"
        placeholder="Search for patient"
      />

      <div class="my-4 flex items-center space-x-2">
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All (5)
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Fully Paid
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Pending
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Canceled
        </cv-button>
      </div>

      <cv-data-table
        ref="table"
        :data="[]"
        :columns="columns"
        :pagination="{ itemsPerPage:10, numberOfItems: 12, pageSizes: [10, 15, 20, 25] }"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-4 space-x-2">
                <Avatar :name="$faker().name.findName()" />
                <div>
                  <p>{{ $faker().name.findName() }}</p>
                  <p class="text-secondary text-xs">
                    {{ $faker().random.boolean() ? 'male' : 'female' }}, {{ $utils.createRandom(100) }} years
                  </p>
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $faker().phone.phoneNumber() }}</p>
            </cv-data-table-cell>
            
            
            <cv-data-table-cell>
              <p>{{ Math.round(Math.random()) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ Math.round(Math.random()) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="lowercase">{{ $faker().internet.email() }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div
                class="flex items-center cursor-pointer"
                @click="$trigger('billing:detail:open')"
              >
                View bill
                <div
                  class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
                >
                  <img
                    src="@/assets/img/view 1.svg"
                    alt=""
                  >
                </div>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <ViewBillingDetails />
  </div>
</template>

<script>
// import Add from '@carbon/icons-vue/es/add/32'
import ViewBillingDetails from '@/components/admin/modals/ViewBillingDetails'
export default {
  name: 'Clients',

  components: { ViewBillingDetails },

  data() {
    return {
      search: '',
      columns: [
        'Patient',
        'MR Number',
        'Amount Recieved',
        'Payment Method',
        'Status',
        'Action',
      ],
    }
  },
}
</script>
